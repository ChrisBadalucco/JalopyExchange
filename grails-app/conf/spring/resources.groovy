import com.je.domain.Automobile
import com.je.domain.Listing
import grails.rest.render.json.JsonCollectionRenderer
import grails.rest.render.json.JsonRenderer

// Place your Spring DSL code here
beans = {
    listingJSONRenderer(JsonRenderer, Listing) {
        excludes = [ 'class' ]
    }
    listingJSONCollectionRenderer(JsonCollectionRenderer, Listing) {
        excludes = [ 'class' ]
    }
    automobileJSONRenderer(JsonRenderer, Automobile) {
        excludes = [ 'class' ]
    }
    automobileJSONCollectionRenderer(JsonCollectionRenderer, Automobile) {
        excludes = [ 'class' ]
    }
}
