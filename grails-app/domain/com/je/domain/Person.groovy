package com.je.domain

import grails.rest.Resource

/**
 * Person
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
@Resource(uri='/persons', formats=['json', 'xml'])
class Person {

    String firstName
    String lastName
//    String email
//    String username
//    String password
    Integer age

//    static hasMany = [
//        automobiles : Automobile,
//        listings : Listing
//    ]

    static constraints = {
        firstName blank : false
        lastName blank : false
//        username size : 5..15, blank : false, unique : true
//        password size : 5..15, blank : false
//        email email : true, blank : true //false
//        age min: 18
    }
}
