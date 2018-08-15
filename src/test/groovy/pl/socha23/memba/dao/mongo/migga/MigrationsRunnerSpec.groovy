package pl.socha23.memba.dao.mongo.migga

import spock.lang.Specification

class MigrationsRunnerSpec extends Specification {

    def "it runs migrations"() {
        given:
        def runner = new MigrationsRunner(null)
        def migrations = new BasicMigrations()
                .add(new TestMigration("t1"))
                .add(new TestMigration("t2"))

        when:
        runner.runMigrations(migrations)

        then:
        (migrations.findMigrationById("t1").get() as TestMigration).isExecuted()
        (migrations.findMigrationById("t2").get() as TestMigration).isExecuted()

    }
}
