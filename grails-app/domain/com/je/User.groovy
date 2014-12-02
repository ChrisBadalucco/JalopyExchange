package com.je

class User {

	transient springSecurityService

    /* Default (injected) attributes of GORM */
    Long id
    Long version

	String username
	String password
    boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

    String firstName
    String lastName
    String email
    int age
    String bio

    static hasMany = [ listings : Listing, automobiles : Automobile ]
	static transients = ['springSecurityService']
    static mappedBy  = [ listings: 'seller' ]
	static constraints = {
		username blank: false, unique: true
		password blank: false
        firstName nullable: true
        lastName nullable: true
        email email: true, nullable: true
        age nullable: true
        bio nullable: true
        listings nullable: true
        automobiles nullable: true
	}

	static mapping = {
		password column: '`password`'
	}

    String toString() {
        return "user[$id $username $firstName $lastName $email]"
    }

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role }
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}
}
