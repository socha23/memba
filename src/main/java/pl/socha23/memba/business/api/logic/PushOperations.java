package pl.socha23.memba.business.api.logic;

public interface PushOperations {
    void pushTo(String userId);
    void addPushEndpoint(String userId, String endpoint);

}
