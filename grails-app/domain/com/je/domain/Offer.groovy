package com.je.domain

import grails.rest.Resource

// holds transaction information between buyer, seller, listing, and car
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
