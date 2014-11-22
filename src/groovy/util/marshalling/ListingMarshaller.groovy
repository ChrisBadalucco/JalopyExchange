package util.marshalling

import com.je.Automobile
import com.je.Listing
import grails.converters.JSON

/**
 * Created by Chris on 11/5/14.
 */
class ListingMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Listing) { Listing listing ->
            def auto = Automobile.findById(listing.automobile.id)
            return [
                id : listing.id,
                autoMake : auto.make,
                autoModel : auto.model,
                autoYear : auto.year,
                autoDescription : auto.description,
                automobile : auto,
                seller : listing.user.username,
                askingPrice : listing.askingPrice,
//                endDate : listing.endDate,
                isActive : listing.isActive,
                lastUpdated : listing.lastUpdated
            ]
        }
    }
}
