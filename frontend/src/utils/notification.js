// ë¸Œë¼?°ì? ?Œë¦¼ ? í‹¸ë¦¬í‹°

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.log('??ë¸Œë¼?°ì????Œë¦¼??ì§€?í•˜ì§€ ?ŠìŠµ?ˆë‹¤.');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

export const showNotification = (title, options = {}) => {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: options.body || '',
            icon: options.icon || '/logo192.png',
            badge: options.badge || '/logo192.png',
            tag: options.tag || 'default',
            requireInteraction: options.requireInteraction || false
        });
    }
};

export const scheduleNotification = (eventTime, message, minutesBefore = [30, 15, 5]) => {
    const now = new Date();
    const eventDate = new Date(eventTime);
    
    minutesBefore.forEach(minutes => {
        const notifyTime = new Date(eventDate.getTime() - minutes * 60 * 1000);
        const delay = notifyTime.getTime() - now.getTime();
        
        if (delay > 0) {
            setTimeout(() => {
                showNotification('?¼ì • ?Œë¦¼', {
                    body: `${minutes}ë¶???${message}`,
                    tag: `event-${eventTime}`
                });
            }, delay);
        }
    });
};

