package util.marshalling

import com.je.Listing
import grails.converters.JSON
/**
 * Created by Chris on 11/5/14.
 */
class ListingMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Listing) { Listing listing ->
            //def auto = Automobile.findByVin(listing.automobile.id)
            return [
                id : listing.id,
                seller : listing.seller.username,
//                buyer : listing.user.username,
                price : listing.price,
                isActive : listing.isActive,
                autoMake : listing.automobile.make,
                autoModel : listing.automobile.model, //auto.model,
                autoYear : listing.automobile.year, //auto.year,
                autoDescription : listing.automobile.description, //auto.description,
                automobile : listing.automobile,//auto,
                lastUpdated : listing.lastUpdated
            ]
        }
    }
}
