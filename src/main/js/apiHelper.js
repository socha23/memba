import fetch from 'isomorphic-fetch'

var idToken = null;

function jsonGet(path) {
    return fetch("/api" + path, {
        credentials: 'same-origin',
        headers: {
            "Authorization": "Bearer " + idToken,
            "Content-Type": "application/json"
        }
    })
        .then(unpackResponse)
}

function jsonPost(path, payload) {
    return fetch("/api" + path, {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Authorization": "Bearer " + idToken,
            "Content-Type": "application/json"
        }
    })
        .then(unpackResponse)
}


const unpackResponse = r => {
    if (r.ok) {
        return r.json()
    } else {
        console.log(r);
        window.alert("Error " + r.status + " " + r.statusText);
    }
};

function setIdToken(token) {
    idToken = token;
}

module.exports = {
    jsonGet: jsonGet,
    jsonPost: jsonPost,
    setIdToken: setIdToken
};
