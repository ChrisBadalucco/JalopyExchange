package com.je.domain

import grails.rest.Resource

/**
 * Automobile
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
@Resource(uri='/main/automobiles', formats=['json', 'xml'])
class Automobile {

    Long vin
    String make
    String model
    int year
    String owner

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

    // TODO hasOne [owner : Person]

    static constraints = {
        vin blank : false, unique : true
        year size: 4
        // TODO owner unique: true
    }

    String getDescription() {
        "$year$make$model"
    }
}
