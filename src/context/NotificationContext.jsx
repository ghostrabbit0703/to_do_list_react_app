import { createContext, useCallback, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {

        setNotifications((current) =>
            current.filter((notification) => notification.id !== id)
        );

    }, []);

    const notify = useCallback((type, message, duration = 3000) => {

        const id = Date.now() + Math.random();

        setNotifications((current) => [
            ...current,
            {
                id,
                type,
                message,
                duration
            }
        ]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

    }, [removeNotification]);

    const success = useCallback(
        (message, duration) => notify('success', message, duration),
        [notify]
    );

    const error = useCallback(
        (message, duration) => notify('error', message, duration),
        [notify]
    );

    const warning = useCallback(
        (message, duration) => notify('warning', message, duration),
        [notify]
    );

    const info = useCallback(
        (message, duration) => notify('info', message, duration),
        [notify]
    );

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                notify,
                success,
                error,
                warning,
                info,
                removeNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {

    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            'useNotification debe utilizarse dentro de NotificationProvider'
        );
    }

    return context;
}