import fetch from 'isomorphic-fetch'

var idToken = null;

function jsonGet(path) {
    return fetch("/api" + path, {
        credentials: 'same-origin',
        headers: {
            "Authorization": "Bearer " + idToken
        }
    })
        .then(r => r.json())
}

function setIdToken(token) {
    idToken = token;
}

module.exports = {
    jsonGet: jsonGet,
    setIdToken: setIdToken
};
