package util.marshalling

import com.je.User
import grails.converters.JSON

/**
 * Created by Chris on 11/5/14.
 */
class UserMarshaller {

    void register() {
        JSON.registerObjectMarshaller(User) {

            def returnSet = [:]

            returnSet.username = it.username

            return returnSet
        }
    }
}
