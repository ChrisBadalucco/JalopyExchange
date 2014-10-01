package com.je.domain

import grails.rest.Resource

@Resource(uri='/users', formats=['json', 'xml'])
class User {

    String firstName
    String lastName
    String email
    String username
    String password
    Integer age

    static constraints = {
        firstName blank: false
        lastName blank: false
        username size: 5..15, blank: false, unique: true
        password size: 5..15, blank: false
        email email: true, blank: false
        age min: 18
    }
}
