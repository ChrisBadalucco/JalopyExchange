package util.marshalling

/**
 * Created by Chris on 11/5/14.
 */
class CustomObjectMarshallers {
    List marshallers = []

    def register() {
        marshallers.each{ it.register() }
    }
}
