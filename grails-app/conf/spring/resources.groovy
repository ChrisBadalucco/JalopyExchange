import util.marshalling.AutomobileMarshaller
import util.marshalling.CustomObjectMarshallers
import util.marshalling.ListingMarshaller
import util.marshalling.UserMarshaller

// Place your Spring DSL code here
beans = {
    customObjectMarshallers(CustomObjectMarshallers) {
        marshallers = [
                new ListingMarshaller(),
                new AutomobileMarshaller(),
                new UserMarshaller()
        ]
    }
}
