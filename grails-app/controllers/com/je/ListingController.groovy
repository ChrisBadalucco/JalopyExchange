package com.je
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class ListingController extends RestfulController {

    def springSecurityService
    def messageSource

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    ListingController() {
        super(Listing)
    }

    def index() {
        def data
        def hasSeller = params.int('seller') > 0
        def isActive = params?.isActive
        def hasStatus = params?.isActive != null && params?.isActive != ""

        if (hasStatus) {
            def boolActive = params.boolean('isActive')
        }

        if (hasSeller && hasStatus) {
            data = Listing.findAllBySellerAndIsActive(User.findById(params.int('seller')), params.boolean('isActive').booleanValue())
        } else if(hasSeller && hasStatus == false) {
            data = Listing.findAllBySeller(User.findById(params.int('seller')))
        } else if (hasSeller == false && hasStatus){
            data = Listing.findAllByIsActive(params.boolean('isActive').booleanValue())
        } else {
            data = Listing.list(params)
        }
        render([success: true, data: data] as JSON)
    }

    def indexUserOnly() {
        render([success: true, data: springSecurityService.currentUser.listings] as JSON)
    }

    @Transactional
    def save() {

        // TODO check if putting Listing listingInstance as parameter fixes this manual process

        def json = request.JSON
        def listingInstance = new Listing(json)
        listingInstance.seller = springSecurityService.currentUser

        def auto = Automobile.findById(json.autoId)
        listingInstance.automobile = auto
        listingInstance.isActive = true

        def currentMax = Listing.where {
            id == max(id)
        }.list()

        listingInstance.id = currentMax[0].id + 1

        if (listingInstance == null) {
            log.error "Failed to save Listing."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            log.error "Failed to save Listing."
            def list = []
            listingInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Invalid Listing.' + list ] as JSON)
            return
        }

        listingInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def update(Listing listingInstance) {
        if (listingInstance == null) {
            log.error "Failed to update Listing."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
            return
        }

        listingInstance.validate()
        if (listingInstance.hasErrors()) {
            log.error "Failed to update Listing."
            def list = []
            listingInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Unable to update Listing. ' + list ] as JSON)
            return
        }

        listingInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def delete(Listing listingInstance) {
        if (listingInstance == null) {
            log.error "Failed to delete Listing."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Listing.'] as JSON)
            return
        }

        listingInstance.delete flush:true
        render([success: true, data: []] as JSON)
    }
}
