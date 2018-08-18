package pl.socha23.memba.web.todos


import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.business.impl.TestUserProvider
import pl.socha23.memba.web.todos.controllers.ProfileController
import spock.lang.Specification

class ProfileSpec extends Specification {

    def "current user profile"() {
        given:
        def ops = new TestOps();
        def controller = new ProfileController(ops.profileOps)


        expect:
        controller.getProfile().block().id == TestUserProvider.USER_ID
    }
}
