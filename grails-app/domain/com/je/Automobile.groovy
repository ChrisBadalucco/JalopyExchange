package com.je

import grails.rest.Resource

/**
 * Automobile
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
@Resource(uri='/main/automobiles', formats=['json', 'xml'])
class Automobile {

    /* Default (injected) attributes of GORM */
    Long id
    Long version

    Long vin
    String make
    String model
    int year
    String imageUrl

//    Listing listing

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

    static transients = ['description']

    static hasOne = [ listing : Listing ]
    static belongsTo = [ user : User ]

    static constraints = {
        vin blank : false, unique : true, size: 17
        year size: 4
        listing nullable: true, blank : true
        imageUrl nullable: true
    }

    static mappings = {
        listing cascade: 'all-delete-orphan'
    }

    String getDescription() {
        return "$year $make $model"
    }
}
