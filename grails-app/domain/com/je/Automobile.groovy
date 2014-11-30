package com.je
/**
 * Automobile
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
class Automobile {

    /* Default (injected) attributes of GORM */
    Long id
    Long version

    Long vin
    String make
    String model
    int year

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

    static transients = ['description']

    static hasOne = [ listing : Listing ]
    static belongsTo = [ owner : User ]

    static constraints = {
        vin blank : false, unique : true
        year size: 4
        listing nullable: true, blank : true
    }

    String getDescription() {
        return "$year $make $model"
    }

    String toString() {
        return "automobile[$id $vin $year $make $model]"
    }
}
