package util.marshalling
import com.je.Automobile
import grails.converters.JSON
/**
 * Created by Chris on 11/5/14.
 */
class AutomobileMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Automobile) { Automobile automobile ->
//            def listing = Listing.findById(automobile.listing.id)
            return [
                id : automobile.id,
                vin : automobile.vin,
                make : automobile.make,
                model : automobile.model,
                year : automobile.year,
                description : automobile.description,
                owner : automobile.owner.username,
                listing : automobile.listing,
                lastUpdated : automobile.lastUpdated
            ]
        }
    }
}
