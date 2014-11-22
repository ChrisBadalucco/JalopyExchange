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

//            return [
//                    id : user.id,
//                    username : user.username,
//                    firstName : user.firstName,
//                    lastName : user.lastName,
//                    email : user.email,
//                    age : user.age,
//                    listings : listings,
//                    automobiles : autos
//            ]

            def map = [:]

            map['id'] = user.id
            map['username'] = user.username
            map['email'] = user.email
            map['age'] = user.age == 0 ? null : user.age
            map['firstName'] = user.firstName
            map['lastName'] = user.lastName
            map['bio'] = user.bio
            map['listings'] = listings
            map['automobiles'] = autos

            return map;
        }
    }
}
