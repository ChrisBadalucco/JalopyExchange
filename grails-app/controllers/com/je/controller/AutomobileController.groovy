package com.je.controller

import com.je.domain.Automobile
import grails.rest.RestfulController

class AutomobileController extends RestfulController {
    static responseFormats = ['json', 'xml']

    def automobileService

    AutomobileController() {
        super(Automobile)
    }

    // TODO override index aka get request with a println to show it's working
    def index() {
        log.info "inside of automobile controller index method"
        automobileService.verifyAutomobiles(params);
        respond Automobile.list(params)

    }
}
