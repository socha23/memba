package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.logic.NotificationOperations
import pl.socha23.memba.business.api.logic.TodosNeedingNotificationProvider
import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.impl.pushNotifications.TodoNotificationScheduler
import spock.lang.Specification

import java.time.Instant
import java.time.temporal.ChronoUnit

class TodoNotificationSchedulerSpec extends Specification {

    final NOW = Instant.now()

    def TODOS = [
            new BasicTodo(id:"in_1_minute", when: NOW.plus(1, ChronoUnit.MINUTES)),
            new BasicTodo(id:"in_2_minutes", when: NOW.plus(2, ChronoUnit.MINUTES)),
    ]

    final todoProvider = {fromInc, toEx ->
        TODOS.findAll {t -> t.when != null && !t.when.isBefore(fromInc) && toEx.isAfter(t.when)}
    } as TodosNeedingNotificationProvider;

    def "no matches"() {
        given:
        def mock = Mock(NotificationOperations)
        def scheduler = new TodoNotificationScheduler(mock, todoProvider)

        when:
        scheduler.run(NOW.plusSeconds(10))

        then:
        0 * mock.sendNotificationForTodo(_)
    }

    def "one match"() {
        given:
        def mock = Mock(NotificationOperations)
        def scheduler = new TodoNotificationScheduler(mock, todoProvider)

        when:
        scheduler.run(NOW.plusSeconds(90))

        then:
        1 * mock.sendNotificationForTodo({it.id == "in_1_minute"})
        0 * mock.sendNotificationForTodo({it.id == "in_2_minutes"})
    }

    def "two matches"() {
        given:
        def mock = Mock(NotificationOperations)
        def scheduler = new TodoNotificationScheduler(mock, todoProvider)

        when:
        scheduler.run(NOW.plusSeconds(150))

        then:
        1 * mock.sendNotificationForTodo({it.id == "in_1_minute"})
        1 * mock.sendNotificationForTodo({it.id == "in_2_minutes"})
    }

    def "from is inclusive but to is exclusive"() {
        given:
        def mock = Mock(NotificationOperations)
        def scheduler = new TodoNotificationScheduler(mock, todoProvider)
        scheduler.lastTime = NOW.plusSeconds(60)

        when:
        scheduler.run(NOW.plusSeconds(120))

        then:
        1 * mock.sendNotificationForTodo({it.id == "in_1_minute"})
        0 * mock.sendNotificationForTodo({it.id == "in_2_minutes"})
    }
}

