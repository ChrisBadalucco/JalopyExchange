package com.je
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class AutomobileController {

    def springSecurityService
    def messageSource

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        render([success: true, data: Automobile.list(params)] as JSON)
    }

    def indexUserOnly() {
        render([success: true, data: springSecurityService.currentUser.automobiles] as JSON)
    }

    @Transactional
    def save(Automobile automobileInstance) {
        if (automobileInstance == null) {
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Automobile.'] as JSON)
            return
        }

        automobileInstance.owner = springSecurityService.currentUser

        automobileInstance.validate()
        if (automobileInstance.hasErrors()) {
            def list = []
            automobileInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Invalid Automobile. ' + list ] as JSON)
            return
        }

        automobileInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def update(Automobile automobileInstance) {
        if (automobileInstance == null) {
            log.error "Failed to update Automobile."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Automobile.'] as JSON)
            return
        }

        automobileInstance.validate()
        if (automobileInstance.hasErrors()) {
            log.error "Failed to update Automobile."
            def list = []
            automobileInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Unable to update Automobile. ' + list ] as JSON)
            return
        }

        automobileInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def delete(Automobile automobileInstance) {
        if (automobileInstance == null) {
            log.error "Failed to delete Automobile."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Automobile.'] as JSON)
            return
        }

        automobileInstance.delete flush:true
        render([success: true, data: []] as JSON)
    }
}
