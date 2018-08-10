package pl.socha23.memba.business.api.model;

public interface Todo extends ItemInGroup {
    String getText();
    boolean isCompleted();

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    String getColor();
}
