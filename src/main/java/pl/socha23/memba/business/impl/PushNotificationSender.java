package pl.socha23.memba.business.impl;

import reactor.core.publisher.Mono;

interface PushNotificationSender {

    Mono<Void> sendPushNotification(String endpoint);
}
