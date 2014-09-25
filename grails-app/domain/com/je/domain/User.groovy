package com.je.domain

class User {

    String firstName
    String lastName
    String email
    String username
    String password
    Integer age

    static constraints = {
        username size: 5..15, blank: false, unique: true
        password size: 5..15, blank: false
        email email: true, blank: false
        age min: 18
    }
}
