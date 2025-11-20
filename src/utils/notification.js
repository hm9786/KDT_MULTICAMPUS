// 브라우저 알림 유틸리티

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.log('이 브라우저는 알림을 지원하지 않습니다.');
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
                showNotification('일정 알림', {
                    body: `${minutes}분 후 ${message}`,
                    tag: `event-${eventTime}`
                });
            }, delay);
        }
    });
};

