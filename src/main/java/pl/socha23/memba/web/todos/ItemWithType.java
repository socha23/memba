package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.Item;

public interface ItemWithType extends Item {

    String getItemType();
}
