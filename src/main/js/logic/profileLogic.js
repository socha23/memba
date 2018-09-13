import ServerData from './profile/ServerData'
import Subscriptions from './Subscriptions'

class ProfileLogic {

    profile = null;
    subscriptions = new Subscriptions();
    serverData = new ServerData((data) => {this.onReceiveServerData(data)});

    onReceiveServerData(data) {
        this.profile = data;
        this.subscriptions.callSubscribers();
    }

    subscribe(component, onStateChanged) {
        if (this.subscriptions.countSubscribers() === 0) {
            this.serverData.setupIntervalReload()
        }
        this.subscriptions.subscribe(component, onStateChanged);
    }

    unsubscribe(component) {
        this.subscriptions.unsubscribe(component);
        if (this.subscriptions.countSubscribers() === 0) {
            this.serverData.cancelIntervalReload()
        }
    }

    areItemsNotLoaded() {return this.profile == null}

    getProfile() {
        return this.profile
    }

    getCurrentUserId() {
        return this.profile.id
    }

    findFriendById(id) {
        return this.profile.friends.find(f => f.id === id)
    }

    registerPushSubscription(subscription) {
        this.serverData.registerPushSubscription(subscription);
    }
}

const PROFILE_LOGIC = new ProfileLogic();

export default PROFILE_LOGIC;