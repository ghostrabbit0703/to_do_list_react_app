function NotificationItem({
    type,
    message,
    onClose
}) {

    const typeConfig = {
        success: {
            className: 'alert-success',
            icon: '✓'
        },
        error: {
            className: 'alert-danger',
            icon: '✕'
        },
        warning: {
            className: 'alert-warning',
            icon: '⚠'
        },
        info: {
            className: 'alert-info',
            icon: 'ⓘ'
        }
    };

    const config = typeConfig[type] || typeConfig.info;

    return (
        <div
            className={`alert ${config.className} alert-dismissible fade show shadow-sm mb-2`}
            role="alert"
        >

            <strong className="me-2">
                {config.icon}
            </strong>

            {message}

            <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
            />

        </div>
    );
}

export default NotificationItem;