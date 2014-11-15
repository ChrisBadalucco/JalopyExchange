package util.marshalling

import com.je.Automobile
import com.je.Listing
import com.je.User
import grails.converters.JSON

/**
 * Created by Chris on 11/5/14.
 */
class UserMarshaller {

    void register() {
        JSON.registerObjectMarshaller(User) { User user ->
            def listings = Listing.findByUser(user)
            def autos = Automobile.findByUser(user)

            return [
                    id : listing.id,
                    username : user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    age : user.age,
                    listings : listings,
                    automobiles : autos
            ]
        }
    }
}
