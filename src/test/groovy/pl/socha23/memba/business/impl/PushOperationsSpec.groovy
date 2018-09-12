package pl.socha23.memba.business.impl


import spock.lang.Specification

class PushOperationsSpec extends Specification {

    def "push to nonexistant user doesn't crash"() {
        given:
        def ops = new TestOps()

        when:
        ops.pushOps.pushTo("no_such_user")

        then:
        notThrown(Exception)
    }

    def "push sends messages to valid endpoints"() {
        given:
        def ops = new TestOps()
        ops.addPushSubscription("valid1")
        ops.addPushSubscription("invalid1")
        ops.addPushSubscription("valid2")
        ops.addPushSubscription("invalid2")
        ops.pushSender
                .addValidEndpoint("valid1")
                .addValidEndpoint("valid2")

        when:
        ops.pushOps.pushTo(TestUserProvider.USER_ID)

        then:
        ops.pushSender.pushSuccesses.contains("valid1")
        ops.pushSender.pushSuccesses.contains("valid2")
        ops.pushSender.pushFailures.contains("invalid1")
        ops.pushSender.pushFailures.contains("invalid2")
    }

    def "invalid endpoints removed on push"() {
        given:
        def ops = new TestOps()
        ops.addPushSubscription("valid")
        ops.addPushSubscription("invalid")
        ops.pushSender.addValidEndpoint("valid")

        when:
        ops.pushOps.pushTo(TestUserProvider.USER_ID)

        then:
        ops.pushSender.pushFailures.contains("invalid")

        def subscriptions = ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID)
        subscriptions*.endpoint.contains("valid");
        !subscriptions*.endpoint.contains("invalid");
    }

    def "add push endpoint"() {
        given:
        def ops = new TestOps()
        ops.addPushSubscription("endpoint")

        expect:
        ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID)[0].endpoint == "endpoint"
    }

    def "can't add same endpoint twice"() {
        given:
        def ops = new TestOps()
        ops.addPushSubscription("endpoint")
        ops.addPushSubscription("endpoint")

        expect:
        ops.profileStore.listPushSubscriptions(TestUserProvider.USER_ID).size() == 1
    }

}
