export default class Subscriptions {

    subscriptionIdAutoinc = 0;
    subscribers = {};

    subscribe(component, onStateChanged) {
        const subscriptionId = this.subscriptionIdAutoinc++;
        component.subscriptionId = subscriptionId;
        this.subscribers[subscriptionId] = onStateChanged;
    }

    unsubscribe(component) {
        const subscriptionId = component.subscriptionId;
        delete this.subscribers[subscriptionId];
    }

    countSubscribers() {
        return Object.keys(this.subscribers).length;
    }

    callSubscribers() {
        for (const subscriptionId in this.subscribers) {
            if (this.subscribers.hasOwnProperty(subscriptionId)) {
                this.subscribers[subscriptionId]()
            }
        }
    }
}
