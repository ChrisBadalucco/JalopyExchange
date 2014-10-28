package com.je

/**
 * Person
 * TODO (A domain class describes the data object and it's mapping to the database)
 */
class Person extends User {

    String email

//    static hasMany = [
//        automobiles : Automobile,
//        listings : Listing
//    ]

    static constraints = {
        email email : true

//        firstName blank : false
//        lastName blank : false
    }
}
