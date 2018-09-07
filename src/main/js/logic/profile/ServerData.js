import {jsonGet, jsonPost} from '../apiHelper'

const REFRESH_ITEMS_EVERY_MS = 300 * 1000;

export default class ServerData {

    reloadIntervalHandler = null;
    onReceiveProfile = null;
    lastFetchOn = 0;

    constructor(onReceiveProfile) {
        this.onReceiveProfile = onReceiveProfile;
    }

    setupIntervalReload() {
        this._reload();
        this.reloadIntervalHandler = setInterval(() => {
            this._reload()
        }, REFRESH_ITEMS_EVERY_MS);
    }

    cancelIntervalReload() {
        clearInterval(this.reloadIntervalHandler);
    }

    _reload() {
        this._fetchProfile();
    }

    _fetchProfile() {
        const fetchTime = Date.now();
        this.lastFetchOn = fetchTime;
        jsonGet("/profile")
            .then(r => {
                if (this.lastFetchOn === fetchTime) {
                    this._receiveProfile(r)
                }
            });
    }

    _receiveProfile(items) {
        this.onReceiveProfile(items);
    }

    postNewPushEndpoint(endpoint) {
        jsonPost("/profile/pushEndpoints", {endpoint: endpoint})
            .then(this._reload());
    }


}
