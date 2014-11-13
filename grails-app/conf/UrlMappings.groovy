class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/listing")
        "/listings"(view:"/listing")
        "/users"(view:"/user")
        "/myaccount"(view:"/myaccount")
        "500"(view:'/error')

        "/main/listing"(resources: 'listing', parseRequest: true)
        "/main/user"(resources: 'user', parseRequest: true)
        "/main/user/sellers"(controller: 'user', parseRequest: true, action: 'indexSellers')
        "/main/automobile"(resources: 'automobile', parseRequest: true)
        "/main/automobile/user"(controller: 'automobile', parseRequest: true, action: 'indexUserOnly')
        "/main/listing/user"(controller: 'listing', parseRequest: true, action: 'indexUserOnly')
	}
}
