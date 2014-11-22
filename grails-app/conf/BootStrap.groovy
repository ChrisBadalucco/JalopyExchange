import com.je.Automobile
import com.je.Listing
import com.je.Role
import com.je.User
import com.je.UserRole
import grails.util.Environment
import org.springframework.web.context.support.WebApplicationContextUtils

import javax.servlet.ServletContext


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

    private static void seedTestData(ServletContext servletContext) {
        def springContext = WebApplicationContextUtils.getWebApplicationContext(servletContext)
        // Custom marshalling
        springContext.getBean( "customObjectMarshallers" ).register()

        println "Start loading persons into database"
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        def adminUser = new User(id: 1L, username: 'admin', password: 'admin')
        adminUser.save(flush: true)

        def chrisUser = new User(id: 2L, username: 'badaluccoc843', password: 'chris', firstName: 'Chris', lastName: 'Badalucco', email: 'badaluccoc843@strose.edu', age: 29, bio: 'my bio')
        chrisUser.save(flush: true)

        def joeUser = new User(id: 3L, username: 'joe123', password: 'joe', firstName: 'Joe', lastName: 'Generon', email: 'joe73@aol.com', age: 37)
        joeUser.save(flush: true)

        def tomUser = new User(id: 4L, username: 'tom456', password: 'tom', firstName: 'Tom', lastName: 'Marvin', email: 'tm@yahoo.com', age: 68)
        tomUser.save(flush: true)

        UserRole.create adminUser, adminRole, true

        UserRole.create chrisUser, userRole, true
        UserRole.create joeUser, userRole, true
        UserRole.create tomUser, userRole, true

        assert User.count() == 4
        assert Role.count() == 2
        assert UserRole.count() == 4
        println "Finished loading $User.count persons into database"

        println "Start loading automobiles into database"
        def wrx = new Automobile(vin: 12345678901234567L, make: "Subaru", model: "WRX", year: "2014", user: chrisUser,
                imageUrl: 'http://images.thecarconnection.com/lrg/2015-subaru-wrx_100457402_l.jpg')
        assert wrx.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def evo = new Automobile(vin: 18165132111876113L, make: "Mitsubishi", model: "Evolution", year: "1998", user: chrisUser)
        assert evo.save(failOnError:true, flush:true, insert: true)
        evo.errors = null

        def wrangler = new Automobile(vin: 98765432109876543L, make: "Jeep", model: "Wrangler", year: "2000", user: joeUser)
        assert wrangler.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        assert Automobile.count == 3;
        println "Finished loading $Automobile.count automobiles into database"

        println "Start loading listings into database"
        def listingWrx = new Listing(automobile: wrx, user: chrisUser, /*endDate: new Date(),*/ askingPrice: 30000, isActive: true)
        assert listingWrx.save(failOnError:true, flush:true, insert: true)
        listingWrx.errors = null

        def listingWrangler = new Listing(automobile: wrangler, user: joeUser, /*endDate: new Date(),*/ askingPrice: 15000, isActive: false)
        assert listingWrangler.save(failOnError:true, flush:true, insert: true)
        listingWrangler.errors = null

        assert Listing.count == 2;
        println "Finished loading $Listing.count listings into database"
    }
}
