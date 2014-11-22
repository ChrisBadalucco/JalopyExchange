package com.je

import grails.converters.JSON
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Secured('ROLE_USER')
@Transactional(readOnly = true)
class UserController extends RestfulController{

    def springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

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
        render ([success: true, data: [] ] as JSON) // FIXME!!!!!!
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def save(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        userInstance.save flush:true
        respond userInstance, [status: CREATED]
    }

    @Transactional
    def update(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        userInstance.save flush:true
        respond userInstance, [status: OK]
    }

    @Secured('ROLE_ADMIN')
    @Transactional
    def delete(User userInstance) {

        if (userInstance == null) {
            render([success: false, message: 'Invalid User. Please try again.'] as JSON)
            return
        }

        //userInstance.delete flush:true
        User.executeUpdate("delete User c where c.id = :oldId", [oldId: userInstance.id])
        render([success: true, data: []] as JSON)
    }
}
