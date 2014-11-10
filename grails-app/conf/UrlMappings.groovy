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
        "500"(view:'/error')

        "/main/listing"(resources: 'listing', parseRequest: true)
        "/main/user"(resources: 'user', parseRequest: true)
        "/main/automobile"(resources: 'automobile', parseRequest: true)
	}
}
