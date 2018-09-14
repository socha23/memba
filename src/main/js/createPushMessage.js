import momentToString from './momentToString'

function createPushMessage(todo) {
    return {
        title: todo.text,
        options: {
            body: todo.when ? momentToString(todo.when) : "Memba?",
            requireInteraction: true,
            renotify: true,
            tag: todo.id,
            icon: 'memba192x192.png',
            vibrate: [100, 50, 100],
            data: todo
            /*
            ,
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
            */
        }
    };
}

export default createPushMessage