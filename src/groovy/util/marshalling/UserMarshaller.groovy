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
            def listings = Listing.findBySeller(user)
            def autos = Automobile.findByOwner(user)
            def map = [:]

            map['id'] = user.id
            map['username'] = user.username
            map['email'] = user.email
            map['age'] = user?.age
            map['firstName'] = user?.firstName
            map['lastName'] = user?.lastName
            map['bio'] = user?.bio
            map['listings'] = listings
            map['automobiles'] = autos

            return map
        }
    }
}
