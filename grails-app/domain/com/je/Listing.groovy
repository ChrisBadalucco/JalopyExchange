package com.je

/**
 * Listing
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
class Listing {

//    /* Default (injected) attributes of GORM */
//    Long id
//    Long version

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

//    User seller
    Automobile automobile
    boolean isActive

    Date endDate
    BigDecimal askingPrice

    static belongsTo = [ user : User]
//    static hasOne = [ automobile : Automobile ]

    static constraints = {
        id blank : false, unique : true
        automobile unique : true
    }
}