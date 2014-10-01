package com.je.controller

import com.je.domain.Listing
import grails.rest.RestfulController

class ListingController extends RestfulController {
    static responseFormats = ['json', 'xml']

    ListingController() {
        super(Listing)
    }

//    protected Listing queryForResource(Serializable id) {
//        Listing.where {
//            id == id && user.username = params.username
//        }
//    }
}
