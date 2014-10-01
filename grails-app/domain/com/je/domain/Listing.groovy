package com.je.domain

class Listing {

    Long id
    Automobile automobile
    User seller
    Date startDate
    Date endDate
    BigDecimal askingPrice

    static constraints = {
        id blank: false, unique: true
    }
}
