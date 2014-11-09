package com.je

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class ListingController extends RestfulController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    ListingController() {
        super(Listing)
    }

    def index(Integer max) {
        log.info "listing controller - index method invoked"
        params.max = Math.min(max ?: 10, 100)
        // render Listing.list(params) as JSON
        render([success: true, data: Listing.list(params)] as JSON)
    }

    @Transactional
    def save() {
//    def save() {
//        def listingInstance = new Listing(JSON.parse(request.JSON));
        log.info "listing controller - save method invoked"
        def listingInstance = new Listing(params)
        if (listingInstance == null) {
            // render status: NOT_FOUND
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            //render status: NOT_ACCEPTABLE
            render([success: false, message: 'Invalid Listing. Please try again.'] as JSON)
            return
        }

        listingInstance.save flush:true
        // respond listingInstance, [status: CREATED]
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def update(Listing listingInstance) {
        if (listingInstance == null) {
            render status: NOT_FOUND
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        listingInstance.save flush:true
        respond listingInstance, [status: OK]
    }

    @Transactional
    def delete(Listing listingInstance) {

        if (listingInstance == null) {
            render status: NOT_FOUND
            return
        }

        listingInstance.delete flush:true
        render status: NO_CONTENT
    }
}
