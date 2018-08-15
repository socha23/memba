package pl.socha23.memba.dao.mongo.migga

import spock.lang.Specification

class MigrationsRunnerSpec extends Specification {

    def "it runs migrations"() {
        given:
        def runner = new MigrationsRunner(null ,new TestExecutedMigrationsStore())
        def migrations = new BasicMigrations()
                .add(new TestMigration("t1"))
                .add(new TestMigration("t2"))

        when:
        runner.runMigrations(migrations)

        then:
        (migrations.findMigrationById("t1").get() as TestMigration).isExecuted()
        (migrations.findMigrationById("t2").get() as TestMigration).isExecuted()

    }

    def "it runs migrations that haven't completed before"() {
        given:
        def store = new TestExecutedMigrationsStore(["t1"])
        def runner = new MigrationsRunner(null, store)
        def migrations = new BasicMigrations()
                .add(new TestMigration("t1"))
                .add(new TestMigration("t2"))

        when:
        runner.runMigrations(migrations)

        then:
        !(migrations.findMigrationById("t1").get() as TestMigration).isExecuted()
        (migrations.findMigrationById("t2").get() as TestMigration).isExecuted()

    }

    def "migrations arent executed twice"() {
        given:
        def store = new TestExecutedMigrationsStore()
        def runner = new MigrationsRunner(null, store)

        when:
        def migrations = new BasicMigrations()
                .add(new TestMigration("t1"))
        runner.runMigrations(migrations)

        then:
        (migrations.findMigrationById("t1").get() as TestMigration).isExecuted()

        when:
        def migrations2 = new BasicMigrations()
                .add(new TestMigration("t1"))
        runner.runMigrations(migrations2)

        then:
        !(migrations2.findMigrationById("t1").get() as TestMigration).isExecuted()
    }

    def "can't have two migrations with same ids"() {
        when:
        new BasicMigrations()
                .add(new TestMigration("t1"))
                .add(new TestMigration("t1"))
        then:
        thrown(Exception)
    }

}
