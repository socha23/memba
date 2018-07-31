package pl.socha23.memba.web;

import java.util.List;

public class ListResult<T> {

    private List<T> items;

    private ListResult(List<T> items) {
        this.items = items;
    }

    public List<T> getItems() {
        return items;
    }

    public static <T> ListResult<T> of(List<T> items) {
        return new ListResult<>(items);
    }
}
