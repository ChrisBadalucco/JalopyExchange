package util.marshalling

import com.je.Listing
import grails.converters.JSON
/**
 * Created by Chris on 11/5/14.
 */
class ListingMarshaller {

    void register() {
        JSON.registerObjectMarshaller(Listing) { Listing listing ->
            def map = [:]

            map['id'] = listing.id
            map['seller'] = listing.seller.username
            map['buyer'] = listing.buyer?.username
            map['price'] = listing.price
            map['isActive'] = listing.isActive
            map['lastUpdated'] = listing.lastUpdated

            map['auto'] = listing.automobile
            map['autoMake'] = listing.automobile.make
            map['autoModel'] = listing.automobile.model
            map['autoYear'] = listing.automobile.year
            map['autoDescription'] = listing.automobile.description

            return map
        }
    }
}
