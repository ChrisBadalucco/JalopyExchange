JalopyExchange - Developer Document
===================================
#The College of Saint Rose C.I.S. Masters Project
    Web Application that simulates buying/selling of automobiles

#Git Repository - https://github.com/badastrose/JalopyExchange
    This is an open-source project. Feel free to fork the code and run with the idea!

    This software is built off of GRAILS.
    Grails provides you with a web container and data source all-in-one solution in
    building  a Groovy/Java based web application.  This project was built off the
    default H2 in-memory database and it runs off the default Tomcat web container.
 
    #NOTE - The repository also includes Grails plugins as well as Intellij IDE
    specific files.
 
#How to run the application:
    Once you have Groovy and Grails downloaded and configured for you system,
    open a command prompt/terminal and execute the script "grails run-app" from
    inside the root of the project directory.  Grails will build and deploy the
    application and by default, make the app available on:
    http://localhost:8080/JalopyExchange
 
#Database Design
    The database was designed using GORM (part of Grails) and it is managed solely
    by the associations defined by the domain classes. All data is inject at runtime
    from the BootStrap.groovy file. If the data model changes, you may need to make
    changes to the mock data found in that file.
