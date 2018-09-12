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
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "valid1")
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "invalid1")
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "valid2")
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "invalid2")
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
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID,"valid")
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "invalid")
        ops.pushSender.addValidEndpoint("valid")

        when:
        ops.pushOps.pushTo(TestUserProvider.USER_ID).block()

        then:
        ops.pushSender.pushFailures.contains("invalid")

        def subscriptions = ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID)
        subscriptions.contains("valid");
        !subscriptions.contains("invalid");
    }

    def "add push endpoint"() {
        given:
        def ops = new TestOps()
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "endpoint")

        expect:
        ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID)[0] == "endpoint"
    }

    def "can't add same endpoint twice"() {
        given:
        def ops = new TestOps()
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "endpoint")
        ops.pushOps.addPushEndpoint(TestUserProvider.USER_ID, "endpoint")

        expect:
        ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID).size() == 1
    }

}
