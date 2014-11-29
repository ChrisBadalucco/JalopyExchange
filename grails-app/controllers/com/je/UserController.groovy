package com.je
import grails.converters.JSON
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class UserController extends RestfulController{

    def springSecurityService
    def messageSource

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {

        /****** HELPFUL SECURITY UTILITIES ******/
        User user = springSecurityService.currentUser
        def auth = springSecurityService.authentication
        def principal = springSecurityService.principal

        def roles = SpringSecurityUtils.authoritiesToRoles()
        def principalAuth = SpringSecurityUtils.principalAuthorities
        def notGranted = SpringSecurityUtils.ifNotGranted('ROLE_ADMIN')
        def isAdmin = SpringSecurityUtils.ifAnyGranted('ROLE_ADMIN')

        def data
        if(!isAdmin) {
            data = User.findByUsername(user.username)
        } else {
            data = User.list()
        }

        render([success: true, data: data] as JSON)
    }

    def indexSellers() {
        def query = User.where {
            automobiles.size() > 0
        }

        render ([success: true, data: query.list() ] as JSON)
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def save(User userInstance) {
        if (userInstance == null) {
            log.error "Failed to save User."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid User.'] as JSON)
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            log.error "Failed to save User."
            def list = []
            userInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Unable to save User. ' + list ] as JSON)
            return
        }

        userInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Transactional
    def update(User userInstance) {
        if (userInstance == null) {
            log.error "Failed to update User."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid User.'] as JSON)
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            log.error "Failed to update User."
            def list = []
            userInstance.errors.allErrors.each {
                log.error messageSource.getMessage(it, null)
                list << messageSource.getMessage(it, null)
            }
            render([success: false, message: 'Unable to update User. ' + list ] as JSON)
            return
        }

        userInstance.save flush:true
        render([success: true, data: []] as JSON)
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def delete(User userInstance) {

        if (userInstance == null) {
            log.error "Failed to delete User."
            render([success: false, message: 'Error parsing data. Please make sure you are submitting a valid User.'] as JSON)
            return
        }

        userInstance.delete flush:true
        render([success: true, data: []] as JSON)
    }
}
