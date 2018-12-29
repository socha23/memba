package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.logic.NotificationOperations
import pl.socha23.memba.business.api.logic.PushOperations
import pl.socha23.memba.business.api.model.Reminder
import pl.socha23.memba.business.api.model.Todo
import pl.socha23.memba.business.impl.pushNotifications.TodoNotificationScheduler
import pl.socha23.memba.dao.mem.MemTodoStore
import spock.lang.Specification

import java.time.Instant
import java.time.temporal.ChronoUnit

class TodoNotificationSchedulerSpec extends Specification {

    final NOW = Instant.now()

    PushOperations mock
    TodoNotificationScheduler scheduler

    Todo todoInOneMinute
    Todo todoInTwoMinutes

    private Todo todoInFuture(id, long minutesToAdd) {
        def when = NOW.plus(minutesToAdd, ChronoUnit.MINUTES)
        new Todo(id: id, when: when, reminders: [new Reminder(when: when)] as TreeSet)
    }

    def setup() {
        MemTodoStore ts = new MemTodoStore()
        mock = Mock(PushOperations)

        NotificationOperations notificationOperations = new NotificationOperationsImpl(ts, {it -> ["ID"]} as OwnershipManager, mock)
        scheduler = new TodoNotificationScheduler(notificationOperations)
        todoInOneMinute = ts.createTodo(todoInFuture("in_1_minute", 1))
        todoInTwoMinutes = ts.createTodo(todoInFuture("in_2_minutes", 2))
    }

    def "no matches"() {
        when:
        scheduler.run(NOW.plusSeconds(10))

        then:
        0 * mock.pushTo(_, _)
    }

    def "one match"() {
        when:
        scheduler.run(NOW.plusSeconds(90))

        then:
        1 * mock.pushTo(_, {it.id == todoInOneMinute.id})
        todoInOneMinute.reminders[0].notificationSentOn != null

        0 * mock.pushTo(_, {it.id == todoInTwoMinutes.id})
        todoInTwoMinutes.reminders[0].notificationSentOn == null
    }

    def "two matches"() {
        when:
        scheduler.run(NOW.plusSeconds(150))

        then:
        1 * mock.pushTo(_, {it.id == "in_1_minute"})
        1 * mock.pushTo(_, {it.id == "in_2_minutes"})
    }

    def "from is inclusive but to is exclusive"() {
        given:
        scheduler.lastTime = NOW.plusSeconds(60)

        when:
        scheduler.run(NOW.plusSeconds(120))

        then:
        1 * mock.pushTo(_,{it.id == "in_1_minute"})
        0 * mock.pushTo(_, {it.id == "in_2_minutes"})
    }
}

