import Modal from './Modal';
import ModalHeader from './Modalheader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirmar acción',
    message = '¿Estás seguro de que deseas realizar esta acción?',
    confirmText = 'Eliminar',
    cancelText = 'Cancelar',
    loading = false,
    variant = 'danger' // 'danger', 'warning', 'primary'
}) {

    const getVariantClasses = () => {
        switch(variant) {
            case 'danger':
                return {
                    header: 'bg-danger text-white',
                    confirmBtn: 'btn-danger'
                };
            case 'warning':
                return {
                    header: 'bg-warning',
                    confirmBtn: 'btn-warning'
                };
            case 'primary':
                return {
                    header: 'bg-primary text-white',
                    confirmBtn: 'btn-primary'
                };
            default:
                return {
                    header: 'bg-secondary text-white',
                    confirmBtn: 'btn-secondary'
                };
        }
    };

    const variantClasses = getVariantClasses();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader 
                title={title}
                onClose={onClose}
                className={`${variantClasses.header} border-0`}
            />
            <ModalBody>
                <div className="text-center py-3">
                    {/* Icono según el tipo */}
                    {variant === 'danger' && (
                        <div className="mb-3">
                            <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '4rem' }}></i>
                        </div>
                    )}
                    {variant === 'warning' && (
                        <div className="mb-3">
                            <i className="bi bi-exclamation-circle-fill text-warning" style={{ fontSize: '4rem' }}></i>
                        </div>
                    )}
                    {variant === 'primary' && (
                        <div className="mb-3">
                            <i className="bi bi-info-circle-fill text-primary" style={{ fontSize: '4rem' }}></i>
                        </div>
                    )}
                    
                    <p className="fs-5 mb-0">{message}</p>
                    
                    {variant === 'danger' && (
                        <p className="text-muted small mt-2">
                            Esta acción no se puede deshacer.
                        </p>
                    )}
                </div>
            </ModalBody>
            <ModalFooter className="justify-content-center gap-2 border-0">
                <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    className={`btn ${variantClasses.confirmBtn} px-4`}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Eliminando...
                        </>
                    ) : confirmText}
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmModal;