package pl.socha23.memba.web

import reactor.core.publisher.Flux

/**
 *
 */
class FluxUtils {

    static <T> List<T> toList(Flux<T> result) {
        result.collectList().block()
    }
}
