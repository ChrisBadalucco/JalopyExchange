package util.marshalling
import com.je.Automobile
import grails.converters.JSON
/**
 * Created by Chris on 11/5/14.
 */
class AutomobileMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Automobile) { Automobile automobile ->
            def map = [:]

            map['id'] = automobile.id
            map['vin'] = automobile.vin
            map['make'] = automobile.make
            map['model'] = automobile.model
            map['year'] = automobile.year
            map['description'] = automobile.description
            map['lastUpdated'] = automobile.lastUpdated

            map['owner'] = automobile.owner.username

            map['listing'] = automobile.listing

            return map
        }
    }
}
