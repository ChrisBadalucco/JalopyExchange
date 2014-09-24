package com.je.domain

class Listing {

    Automobile automobile
    User buyer
    User seller
    Date startDate
    Date endDate
    BigDecimal askingPrice
    BigDecimal highestOffer // TODO probably move off the listing object to offer object (?)

    static constraints = {
    }
}
