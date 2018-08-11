import fetch from 'isomorphic-fetch'

var idToken = null;

export function jsonGet(path) {
    return jsonCall("GET", path, null)
}

export function jsonPatch(path, payload = {}) {
    return jsonCall("PATCH", path, payload)
}

export function jsonPut(path, payload = {}) {
    return jsonCall("PUT", path, payload)
}

export function jsonPost(path, payload = {}) {
    return jsonCall("POST", path, payload)
}

export function restDelete(path) {
    return restCall("DELETE", path)
}

function jsonCall(method, path, payload) {
    return restCall(method, path, payload)
        .then(unpackResponse)
}

function restCall(method, path, payload) {
    const params = {
        credentials: 'same-origin',
        method: method,
        headers: {
            "Authorization": "Bearer " + idToken,
            "Content-Type": "application/json"
        }
    };
    if (payload != null) {
        params.body = JSON.stringify(payload);
    }
    return fetch("/api" + path, params)
}


const unpackResponse = r => {
    if (r.ok) {
        return r.json()
    } else {
        console.log(r);
        window.alert("Error " + r.status + " " + r.statusText);
    }
};

export function setIdToken(token) {
    idToken = token;
}

