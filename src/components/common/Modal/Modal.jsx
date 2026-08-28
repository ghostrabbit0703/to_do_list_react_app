function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog">
                <div className="modal-content">

                    {children}

                </div>
            </div>
        </div>
    );
}

export default Modal;