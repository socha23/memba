package pl.socha23.memba.business.api.model;

import lombok.Data;

import java.time.Instant;
import java.util.SortedSet;
import java.util.TreeSet;

@Data
public class BasicTodo extends BasicItemInGroup implements Todo {

    private String text;
    private boolean completed;
    private String color;
    private Instant when;
    private SortedSet<Reminder> reminders = new TreeSet<>();

    public static BasicTodo copy(Todo todo) {
        return copy(todo, new BasicTodo());
    }

    protected static <T extends BasicTodo, Q extends Todo> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setText(from.getText());
        to.setCompleted(from.isCompleted());
        to.setColor(from.getColor());
        to.setWhen(from.getWhen());
        to.getReminders().addAll(from.getReminders());
        return to;
    }




}
