function ModalHeader({ title, onClose }) {

    return (
        <div className="modal-header">

            <h5 className="modal-title">
                {title}
            </h5>

            <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar"
            />

        </div>
    );
}

export default ModalHeader;