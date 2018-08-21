package pl.socha23.memba.business.api.model;

import java.util.List;

public interface Group extends ItemInGroup {
    String getText();

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    String getColor();
    String getBackground();

    List<String> getGroupOrder();
    List<String> getTodoOrder();
}
