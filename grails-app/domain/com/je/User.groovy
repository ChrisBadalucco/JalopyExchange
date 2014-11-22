package com.je

class User {

	transient springSecurityService

    /* Default (injected) attributes of GORM */
    Long id
    Long version

	String username
	String password
	boolean enabled = true
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
//        listings cascade: 'all-delete-orphan'
//        automobiles cascade: 'all-delete-orphan'
        listings cascade: 'delete'
        automobiles cascade: 'delete'
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
