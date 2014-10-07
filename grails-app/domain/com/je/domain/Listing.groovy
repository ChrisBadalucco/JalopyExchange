package com.je.domain

import grails.rest.*

/**
 * Listing
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
@Resource(uri='/main/listing', formats=['json', 'xml'])
class Listing {

    /* Default (injected) attributes of GORM */
    Long id
    Long version

    /* Automatic timestamping of GORM */
    Date dateCreated
    Date lastUpdated

    Automobile automobile
    String seller

    Date endDate
    BigDecimal askingPrice

    static constraints = {
        id blank : false, unique : true
    }
}