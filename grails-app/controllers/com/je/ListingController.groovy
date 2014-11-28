package com.je

import grails.converters.JSON
import grails.gorm.DetachedCriteria
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

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
        log.info("listing controller - index invoked")

        def data
        def hasSeller = params.int('seller') > 0
        def hasStatus = params?.isActive != null && params?.isActive != ""

        if (hasSeller && hasStatus) {
            data = Listing.findBySellerAndIsActive(User.findById(params.int('seller')), params.boolean('isActive'))
        } else if(hasSeller && hasStatus == false) {
            data = Listing.findBySeller(User.findById(params.int('seller')))
        } else if (hasSeller == false && hasStatus){
            data = Listing.findByIsActive(params.boolean('isActive'))
        } else {
            data = Listing.list(params)
        }
        render([success: true, data: data] as JSON)
    }

    def indexUserOnly(Integer max) {
        log.info("listing controller - indexUserOnly invoked")
//        User user = springSecurityService.currentUser
//        def data = Listing.findAllByUser(user) ?: []

        render([success: true, data: springSecurityService.currentUser.listings] as JSON)
    }

    @Transactional
    def save() {
        log.info("listing controller - save invoked")

        def jsonObject = request.JSON
        def listingInstance = new Listing(jsonObject)

        listingInstance.id = Listing.getCount()++
        listingInstance.seller = springSecurityService.currentUser
        def auto = Automobile.findByVin(Long.valueOf(jsonObject.autoVin))
        def autoCriteria = new DetachedCriteria(Automobile).build {
            eq 'vin', jsonObject.autoVin
        }
        def results = autoCriteria.list()
        //listingInstance.automobile = Automobile.findByVin(jsonObject.autoVin)
        listingInstance.isActive = true

        if (listingInstance == null) {
            // render status: NOT_FOUND
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            //render status: NOT_ACCEPTABLE
            log.info listingInstance.errors
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
            log.info listingInstance.errors
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
