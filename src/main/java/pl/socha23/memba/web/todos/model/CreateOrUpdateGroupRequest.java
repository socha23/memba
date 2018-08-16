package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.CreateOrUpdateGroup;

public class CreateOrUpdateGroupRequest extends AbstractCreateOrUpdateItemInGroupRequest implements CreateOrUpdateGroup {

    private String text = null;
    private String color = null;

    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text != null ? text.trim() : null;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
