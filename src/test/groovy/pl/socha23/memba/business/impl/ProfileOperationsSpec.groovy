package pl.socha23.memba.business.impl


import spock.lang.Specification

class ProfileOperationsSpec extends Specification {

    def "registering a new profile"() {
        given:
        def ops = new TestOps()

        when:
        ops.profileOps.updateProfile(new TestUser(id: "u", firstName: "user"))

        then:
        ops.profileOps.findUserById("u").block().firstName == "user"
    }

    def "updating a profile"() {
        given:
        def ops = new TestOps()
        ops.profileOps.updateProfile(new TestUser(id: "u", firstName: "user"))

        when:
        ops.profileOps.updateProfile(new TestUser(id: "u", firstName: "user changed"))

        then:
        ops.profileOps.findUserById("u").block().firstName == "user changed"
    }

    def "updating a profile caches update operations"() {
        given:
        def ops = new TestOps()
        ops.profileOps.updateProfile(new TestUser(id: "a", firstName: "a")).block()
        ops.profileOps.updateProfile(new TestUser(id: "b", firstName: "b")).block()
        def aFirstTime = ops.profileStore.getUpdateTime("a")
        def bFirstTime = ops.profileStore.getUpdateTime("b")

        when:
        ops.profileOps.updateProfile(new TestUser(id: "a", firstName: "a")).block()
        ops.profileOps.updateProfile(new TestUser(id: "b", firstName: "b changed")).block()
        def aSecondTime = ops.profileStore.getUpdateTime("a")
        def bSecondTime = ops.profileStore.getUpdateTime("b")

        then:
        aFirstTime == aSecondTime
        bFirstTime != bSecondTime

    }

    def "profile contains users not being the current user"() {
        given:
        def ops = new TestOps()
        ops.profileOps.updateProfile(new TestUser(id: TestUserProvider.USER_ID, firstName: "a")).block()
        ops.profileOps.updateProfile(new TestUser(id: "b", firstName: "b")).block()

        expect:
        ops.profileOps.currentUserProfile.block().friends.find{it.id == TestUserProvider.USER_ID} == null
    }
}
