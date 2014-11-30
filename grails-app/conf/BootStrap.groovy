import com.je.*
import grails.util.Environment
import org.springframework.web.context.support.WebApplicationContextUtils

import javax.servlet.ServletContext
import java.text.SimpleDateFormat

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

        def admin = new User(id: 1L, username: 'admin', password: 'admin').save(flush: true)
        def chris = new User(id: 2L, username: 'chris843', password: 'chris', firstName: 'Chris', lastName: 'Badalucco', email: 'badaluccoc843@strose.edu', age: 29, bio: 'my bio').save(flush: true)
        def joe = new User(id: 3L, username: 'joe123', password: 'joe', firstName: 'Joe', lastName: 'Generon', email: 'joe73@aol.com', age: 37).save(flush: true)
        def tom = new User(id: 4L, username: 'tom456', password: 'tom', firstName: 'Tom', lastName: 'Marvin', email: 'tm@yahoo.com', age: 68).save(flush: true)
        def rockstar = new User(id: 5L, username: 'rockStar33', password: 'rock', firstName: 'Adam', lastName: 'Sellman', email: 'rockStr824@gmail.com', age: 19).save(flush: true)
        def ryan = new User(id: 6L, username: 'giants14', password: 'giant', firstName: 'Ryan', lastName: 'Godfrey', email: 'godfrey@live.com', age: 25).save(flush: true)
        def kc = new User(id: 7L, username: 'kcgreiner', password: 'kc', firstName: 'Kurt', lastName: 'Greiner', email: 'kcg@yahoo.com', age: 24).save(flush: true)

        UserRole.create admin, adminRole, true
        UserRole.create chris, userRole, true
        UserRole.create joe, userRole, true
        UserRole.create tom, userRole, true
        UserRole.create rockstar, userRole, true
        UserRole.create ryan, userRole, true
        UserRole.create kc, userRole, true

        assert User.count() == 7
        assert Role.count() == 2
        assert UserRole.count() == 7
        println "Finished loading $User.count persons into database"

        println "Start loading automobiles into database"

        /* chris cars */
        def wrx = new Automobile(vin: 10000000000000000L, make: "Subaru", model: "WRX", year: "2014", owner: chris)
        assert wrx.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def forester = new Automobile(vin: 11000000000000000L, make: "Subaru", model: "Forester", year: "2003", owner: chris)
        assert forester.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def evo = new Automobile(vin: 20000000000000000L, make: "Mitsubishi", model: "Evolution", year: "1998", owner: chris)
        assert evo.save(failOnError:true, flush:true, insert: true)
        evo.errors = null

        /* joe cars */
        def wrangler = new Automobile(vin: 30000000000000000L, make: "Jeep", model: "Wrangler", year: "2000", owner: joe)
        assert wrangler.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        def fusion = new Automobile(vin: 30200000000000000L, make: "Ford", model: "Fusion", year: "1998", owner: joe)
        assert fusion.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        /* ryan cars */
        def mazda6 = new Automobile(vin: 12340000056700000L, make: "Mazda", model: "6", year: "2013", owner: ryan)
        assert mazda6.save(failOnError:true, flush:true, insert: true)
        mazda6.errors = null

        /* kc cars */
        def eclipse = new Automobile(vin: 93000000000052000L, make: "Mitsubishi", model: "Eclipse", year: "2006", owner: kc)
        assert eclipse.save(failOnError:true, flush:true, insert: true)
        eclipse.errors = null

        /* tom cars */
        def civic = new Automobile(vin: 60330000520010107L, make: "Honda", model: "Civic", year: "2001", owner: tom)
        assert civic.save(failOnError:true, flush:true, insert: true)
        civic.errors = null

        def camry = new Automobile(vin: 20120083970000809L, make: "Toyota", model: "Camry", year: "2015", owner: tom)
        assert camry.save(failOnError:true, flush:true, insert: true)
        camry.errors = null

        def altima = new Automobile(vin: 30209040703600530L, make: "Nissan", model: "Altima", year: "2010", owner: tom)
        assert altima.save(failOnError:true, flush:true, insert: true)
        altima.errors = null

        assert Automobile.count == 10;
        println "Finished loading $Automobile.count automobiles into database"

        println "Start loading listings into database"

        /* joe listings */
        def listWrangler = new Listing(automobile: wrangler, seller: joe, price: 15000, isActive: false, buyer: tom).save(failOnError:true, flush:true, insert: true)
//        assert listWrangler.save(failOnError:true, flush:true, insert: true)
        listWrangler.errors = null

        /* chris listings*/
        def listWrx = new Listing(automobile: wrx, seller: chris, price: 30000, isActive: true).save(failOnError:true, flush:true, insert: true)
        listWrx.errors = null

        def listForester = new Listing(automobile: forester, seller: chris, price: 20399, isActive: true).save(failOnError:true, flush:true, insert: true)
        listForester.errors = null

        /* ryan listings*/
        def listMazda6 = new Listing(automobile: mazda6, seller: ryan, price: 24000, isActive: true).save(failOnError:true, flush:true, insert: true)
        listMazda6.errors = null

        /* kc listings*/
        def listEclipse = new Listing(automobile: eclipse, seller: kc, price: 55000, isActive: true).save(failOnError:true, flush:true, insert: true)
        listEclipse.errors = null

        /* tom listings*/

        def listCivic = new Listing(automobile: civic, seller: tom, price: 9999, isActive: false).save(failOnError:true, flush:true, insert: true)
        listCivic.errors = null

        def listCamry = new Listing(automobile: camry, seller: tom, price: 12050, isActive: false, buyer: chris).save(failOnError:true, flush:true, insert: true)
        listCamry.errors = null

        assert Listing.count == 7;
        println "Finished loading $Listing.count listings into database"
    }
}
