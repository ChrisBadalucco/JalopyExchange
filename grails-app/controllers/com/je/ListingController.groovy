package com.je

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class ListingController extends RestfulController {

    def springSecurityService

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

    def indexUserOnly(Integer max) {
        params.max = Math.min(max ?: 10, 100)
//        respond Automobile.list(params), [status: OK]

        User user = springSecurityService.currentUser
        def data = Listing.findByUser(user) ?: []

        render([success: true, data: data] as JSON)
    }

    @Transactional
    def save() {
        log.info "listing controller - save method invoked"

        def jsonObject = request.JSON
        def listingInstance = new Listing(jsonObject)

        listingInstance.id = Listing.getCount()++
        listingInstance.user = springSecurityService.currentUser
        listingInstance.automobile = Automobile.findByVin(jsonObject.autoVin)
        listingInstance.dateCreated = new Date()
        listingInstance.lastUpdated = new Date()

        if (listingInstance == null) {
            // render status: NOT_FOUND
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            //render status: NOT_ACCEPTABLE
            log.info listingInstance.errors
            render([success: false, message: 'Invalid Listing. Please try again.'] as JSON)
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

    @Secured('ROLE_ADMIN')
    @Transactional
    def delete(Listing listingInstance) {

        if (listingInstance == null) {
            render status: NOT_FOUND
            return
        }

        listingInstance.delete flush:true
        render([success: true, data: []] as JSON)
    }
}
