import com.je.Automobile
import com.je.Listing
import com.je.Role
import com.je.User
import com.je.UserRole
import grails.util.Environment
import org.springframework.web.context.support.WebApplicationContextUtils


class BootStrap {

    def init = { servletContext ->

        def result = '################## running in UNCLEAR mode.'
        println "Application starting ... "
        switch (Environment.current) {
            case Environment.DEVELOPMENT:
                result = 'now running in DEV mode.'
                seedTestData(servletContext)
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



    private static void seedTestData(servletContext) {

        def springContext = WebApplicationContextUtils.getWebApplicationContext(servletContext)
        // Custom marshalling
        springContext.getBean( "customObjectMarshallers" ).register()

        println "Start loading persons into database"
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        def adminUser = new User(username: 'admin', password: 'admin')
        adminUser.save(flush: true)

        def chrisUser = new User(username: 'Chris', password: 'chris')
        chrisUser.save(flush: true)

        def joeUser = new User(username: 'Joe', password: 'joe')
        joeUser.save(flush: true)

        UserRole.create adminUser, adminRole, true

        UserRole.create chrisUser, userRole, true
        UserRole.create joeUser, userRole, true

        assert User.count() == 3
        assert Role.count() == 2
        assert UserRole.count() == 3
        println "Finished loading $User.count persons into database"

        println "Start loading automobiles into database"
        def wrx = new Automobile(vin: 1000L, make: "Subaru", model: "WRX", year: "2014", owner: chrisUser)
        assert wrx.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def wrangler = new Automobile(vin: 2000L, make: "Jeep", model: "Wrangler", year: "2000", owner: joeUser)
        assert wrangler.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        assert Automobile.count == 2;
        println "Finished loading $Automobile.count automobiles into database"

        println "Start loading listings into database"
        def listingWrx = new Listing(automobile: wrx, seller: chrisUser, startDate: new Date(), endDate: new Date(), askingPrice: 30000)
        assert listingWrx.save(failOnError:true, flush:true, insert: true)
        listingWrx.errors = null

        def listingWrangler = new Listing(automobile: wrangler, seller: joeUser, startDate: new Date(), endDate: new Date(), askingPrice: 15000)
        assert listingWrangler.save(failOnError:true, flush:true, insert: true)
        listingWrangler.errors = null

        assert Listing.count == 2;
        println "Finished loading $Listing.count listings into database"
    }
}
