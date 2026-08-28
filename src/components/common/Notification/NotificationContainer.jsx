import { useNotification } from '../../../context/NotificationContext';

import NotificationItem from './NotificationItem';

function NotificationContainer() {

    const {
        notifications,
        removeNotification
    } = useNotification();

    return (
        <div
            className="position-fixed top-0 end-0 p-3"
            style={{
                zIndex: 1055,
                width: '350px',
                maxWidth: '100%'
            }}
        >

            {notifications.map((notification) => (

                <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    message={notification.message}
                    onClose={() =>
                        removeNotification(notification.id)
                    }
                />

            ))}

        </div>
    );
}

export default NotificationContainer;