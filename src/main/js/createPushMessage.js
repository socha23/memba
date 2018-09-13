function createPushMessage(pushData) {
    return {
        title: "Memba?",
        options: {
            body: pushData.text,
            requireInteraction: true,
            renotify: true,
            tag: pushData.id,
            icon: 'memba192x192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2'
            },
            actions: [
                {
                    action: 'explore', title: 'Action one',
                    icon: 'images/checkmark.png'
                },
                {
                    action: 'close', title: 'Action two',
                    icon: 'images/xmark.png'
                },
            ]
        }
    };
}

export default createPushMessage