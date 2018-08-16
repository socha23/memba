let currentUserId = null;

export function setCurrentUserId(id) {
    currentUserId = id;
}

export function currentUserId() {
    return currentUserId;
}