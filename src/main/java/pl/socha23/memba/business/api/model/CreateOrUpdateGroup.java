package pl.socha23.memba.business.api.model;

import java.util.List;

public interface CreateOrUpdateGroup extends CreateOrUpdateItemInGroup{

    String getText();
    String getColor();
    String getBackground();
    List<String> getGroupOrder();
    List<String> getTodoOrder();
}
