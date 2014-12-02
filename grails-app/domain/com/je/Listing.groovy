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
    User buyer
    boolean isActive

    static belongsTo = [ seller : User ]
    static constraints = {
        id blank : false, unique : true
        automobile unique : true
        buyer nullable : true
    }

    String toString() {
        return "listing[$id $automobile $price $buyer $isActive]"
    }
}