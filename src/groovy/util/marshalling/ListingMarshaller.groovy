package util.marshalling

import com.je.Listing
import grails.converters.JSON

/**
 * Created by Chris on 11/5/14.
 */
class ListingMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Listing) { Listing listing ->
            return [
                id : listing.id,
                autoMake : listing.automobile.make,
                autoModel : listing.automobile.model,
                autoYear : listing.automobile.year,
                autoDescription : listing.automobile.description,
                automobile : listing.automobile,
                seller : listing.seller.username,
                askingPrice : listing.askingPrice,
                startDate : listing.dateCreated,
                endDate : listing.endDate,
                lastUpdated : listing.lastUpdated
            ]
        }
    }
}
