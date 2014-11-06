package com.je

import grails.rest.Resource

/**
 * Offer
 * Holds transaction information between buyer, seller, listing, and car
 */
@Resource(uri='/offers', formats=['json', 'xml'])
class Offer {

    User buyer
    User seller
    Listing listing
    BigDecimal offerAmount
    Boolean isAccepted

    static constraints = {
    }
}
