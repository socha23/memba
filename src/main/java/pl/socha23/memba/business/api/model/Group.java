package pl.socha23.memba.business.api.model;

public interface Group extends ItemInGroup {
    String getText();

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    String getColor();
}
