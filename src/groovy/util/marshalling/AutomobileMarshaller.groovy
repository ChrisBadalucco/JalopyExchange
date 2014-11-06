package util.marshalling

import com.je.Automobile
import grails.converters.JSON

/**
 * Created by Chris on 11/5/14.
 */
class AutomobileMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Automobile) { Automobile automobile ->
            return [
                vin : automobile.vin,
                make : automobile.make,
                model : automobile.model,
                year : automobile.year,
                owner : automobile.owner,
                lastUpdated : automobile.lastUpdated
            ]
        }
    }
}
