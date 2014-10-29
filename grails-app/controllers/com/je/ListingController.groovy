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
        render([success: true, data: Listing.list(params)] as JSON) // render Listing.list(params) as JSON
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def save(Listing listingInstance) {
        if (listingInstance == null) {
            log.info "listing controller - save method invoked [listingInstance] " + listingInstance.toString()
            render([success: false, message: 'Application Error Occurred.'] as JSON) // render status: NOT_FOUND
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            render([success: false, message: 'Invalid Listing. Please try again.'] as JSON) //render status: NOT_ACCEPTABLE
            return
        }

        listingInstance.save flush:true
        render([success: true, data: []] as JSON)// respond listingInstance, [status: CREATED]
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
