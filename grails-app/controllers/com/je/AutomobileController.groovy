package com.je

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class AutomobileController {

    def springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        render([success: true, data: Automobile.list(params)] as JSON)
    }

    def indexUserOnly(Integer max) {
        params.max = Math.min(max ?: 10, 100)
//        respond Automobile.list(params), [status: OK]

        User user = springSecurityService.currentUser
        def data = Automobile.findAllByUser(user) ?: []

        render([success: true, data: data] as JSON)
    }

    @Transactional
    def save(Automobile automobileInstance) {
        log.info('automobile controller - save method invoked')

        if (automobileInstance == null) {
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid Automobile.'] as JSON)
            return
        }

        automobileInstance.user = springSecurityService.currentUser

        automobileInstance.validate()
        if (automobileInstance.hasErrors()) {
            log.info automobileInstance.errors
            render([success: false, message: 'Invalid Automobile. Please try again'] as JSON)
            return
        }

        automobileInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def update(Automobile automobileInstance) {
        if (automobileInstance == null) {
            render status: NOT_FOUND
            return
        }

        automobileInstance.validate()
        if (automobileInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        automobileInstance.save flush:true
        respond automobileInstance, [status: OK]
    }

    @Transactional
    def delete(Automobile automobileInstance) {

        if (automobileInstance == null) {
            render status: NOT_FOUND
            return
        }

        automobileInstance.delete flush:true
        render status: NO_CONTENT
    }
}
