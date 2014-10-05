package com.je.controller

import com.je.domain.Listing
import grails.rest.RestfulController

class ListingController extends RestfulController {
    static responseFormats = ['json', 'xml']

    ListingController() {
        super(Listing)
    }

    // TODO override index aka get request with a println to show it's working
}
