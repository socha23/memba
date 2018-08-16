let _currentUserId = null;

export function setCurrentUserId(id) {
    _currentUserId = id;
}

export function currentUserId() {
    return _currentUserId;
}