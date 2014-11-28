package com.je

/**
 * Listing
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
class Listing {

    /* Default (injected) attributes of GORM */
    Long id
    Long version

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

    Automobile automobile
    BigDecimal price
    boolean isActive
    // TODO: User buyer or hasOne buyer assoc.

    static belongsTo = [ seller : User ]

    static constraints = {
        id blank : false, unique : true
        automobile unique : true
    }
}