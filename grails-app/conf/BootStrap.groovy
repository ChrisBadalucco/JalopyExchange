import com.je.Automobile
import com.je.Listing
import com.je.Role
import com.je.User
import com.je.UserRole
import grails.util.Environment


class BootStrap {

    def init = { servletContext ->

        def result = '################## running in UNCLEAR mode.'
        println "Application starting ... "
        switch (Environment.current) {
            case Environment.DEVELOPMENT:
                result = 'now running in DEV mode.'
                seedTestData()
//                seedUsers()
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

    private static void seedUsers() {
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        def adminUser = new User(username: 'admin', password: 'admin')
        adminUser.save(flush: true)

        def userUser = new User(username: 'user', password: 'user')
        userUser.save(flush: true)

        UserRole.create adminUser, adminRole, true
        UserRole.create userUser, userRole, true

        assert User.count() == 2
        assert Role.count() == 2
        assert UserRole.count() == 2
    }

    private static void seedTestData() {
        println "Start loading persons into database"
        seedUsers()
        println "Finished loading $User.count persons into database"

        println "Start loading automobiles into database"
        def wrx = new Automobile(vin: 1000L, make: "Subaru", model: "WRX", year: "2014", owner: "Chris")
        assert wrx.save(failOnError:true, flush:true, insert: true)
        wrx.errors = null

        def wrangler = new Automobile(vin: 2000L, make: "Jeep", model: "Wrangler", year: "2000", owner: "Joe")
        assert wrangler.save(failOnError:true, flush:true, insert: true)
        wrangler.errors = null

        assert Automobile.count == 2;
        println "Finished loading $Automobile.count automobiles into database"

        println "Start loading listings into database"
        def listingWrx = new Listing(automobile: wrx, seller: "Chris", endDate: new Date(1414798699000), askingPrice: 30000)
        assert listingWrx.save(failOnError:true, flush:true, insert: true)
        listingWrx.errors = null

        def listingWrangler = new Listing(automobile: wrangler, seller: "Joe", endDate: new Date(1414798699000), askingPrice: 15000)
        assert listingWrangler.save(failOnError:true, flush:true, insert: true)
        listingWrangler.errors = null

        assert Listing.count == 2;
        println "Finished loading $Listing.count listings into database"
    }
}
