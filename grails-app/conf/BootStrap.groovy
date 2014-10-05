import com.je.domain.Automobile
import com.je.domain.Listing
import grails.util.Environment


class BootStrap {

    def init = { servletContext ->

        def result = '################## running in UNCLEAR mode.'
        println "Application starting ... "
        switch (Environment.current) {
            case Environment.DEVELOPMENT:
                result = 'now running in DEV mode.'
                seedTestData()
                break;
            case Environment.TEST:
                result = 'now running in TEST mode.'
                break;
            case Environment.PRODUCTION:
                result = 'now running in PROD mode.'
                //seedProdData()
                break;
        }
        println "current environment: $Environment.current"
        println "$result"
    }

    def destroy = {
        println "Application shutting down... "
    }

    private void seedTestData() {
        def wrx = null
        println "Start loading automobiles into database"
        wrx = new Automobile(vin: 1000L, make: "Subaru", model: "WRX", year: "2014", owner: "Chris")
        assert wrx.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def wrangler = null
        wrangler = new Automobile(vin: 2000L, make: "Jeep", model: "Wrangler", year: "2000", owner: "Joe")
        assert wrangler.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        assert Automobile.count == 2;
        println "Finished loading $Automobile.count automobiles into database"

        def listingWrx = null
        println "Start loading listings into database"
        listingWrx = new Listing(automobile: wrx, seller: "Chris", endDate: new Date(1414798699000), askingPrice: 30000)
        assert listingWrx.save(failOnError:true, flush:true, insert: true)
        listingWrx.errors = null

        def listingWrangler = null
        listingWrangler = new Listing(automobile: wrangler, seller: "Joe", endDate: new Date(1414798699000), askingPrice: 15000)
        assert listingWrangler.save(failOnError:true, flush:true, insert: true)
        listingWrangler.errors = null

        assert Listing.count == 2;
        println "Finished loading $Listing.count listings into database"
    }
}
