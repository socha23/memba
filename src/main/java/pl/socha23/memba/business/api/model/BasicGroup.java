package pl.socha23.memba.business.api.model;

public class BasicGroup extends BasicItemInGroup implements Group {

    private String text;
    private String color;
    
    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public static BasicGroup copy(Group group) {
        return copy(group, new BasicGroup());
    }

    protected static <T extends BasicGroup, Q extends Todo> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setText(from.getText());
        to.setColor(from.getColor());
        return to;
    }




}
