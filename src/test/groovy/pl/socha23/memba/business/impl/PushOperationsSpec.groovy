package pl.socha23.memba.business.impl


import spock.lang.Specification

class PushOperationsSpec extends Specification {

    def "push to nonexistant user doesn't crash"() {
        given:
        def ops = new TestOps()

        when:
        ops.pushOps.pushTo("no_such_user").block()

        then:
        notThrown(Exception)
    }

    def "push sends messages to valid endpoints"() {
        given:
        def ops = new TestOps()
        ops.profileOps.addCurrentUserPushEndpoint("valid1").block()
        ops.profileOps.addCurrentUserPushEndpoint("invalid1").block()
        ops.profileOps.addCurrentUserPushEndpoint("valid2").block()
        ops.profileOps.addCurrentUserPushEndpoint("invalid2").block()
        ops.pushSender
                .addValidEndpoint("valid1")
                .addValidEndpoint("valid2")

        when:
        ops.pushOps.pushTo(TestUserProvider.USER_ID).block()

        then:
        ops.pushSender.pushSuccesses.contains("valid1")
        ops.pushSender.pushSuccesses.contains("valid2")
        ops.pushSender.pushFailures.contains("invalid1")
        ops.pushSender.pushFailures.contains("invalid2")
    }

    def "invalid endpoints removed on push"() {
        given:
        def ops = new TestOps()
        ops.profileOps.addCurrentUserPushEndpoint("valid").block()
        ops.profileOps.addCurrentUserPushEndpoint("invalid").block()
        ops.pushSender.addValidEndpoint("valid")

        when:
        ops.pushOps.pushTo(TestUserProvider.USER_ID).block()

        then:
        ops.pushSender.pushFailures.contains("invalid")
        ops.getProfileOps().currentUserProfile.block().pushEndpoints.contains("valid")
        !ops.getProfileOps().currentUserProfile.block().pushEndpoints.contains("invalid")
    }
}
