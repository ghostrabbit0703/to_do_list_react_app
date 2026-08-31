import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../common/Modal/ConfirmModal';

function Header({ onToggleSidebar }) {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleConfirmLogout = async () => {
        await logout();
        setConfirmOpen(false);
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container-fluid">

                    <button
                        className="btn btn-outline-secondary me-3"
                        type="button"
                        onClick={onToggleSidebar}
                    >
                        ☰
                    </button>
                    <span className="navbar-brand mb-0 h1">
                        Task Manager
                    </span>

                    <div className="d-flex align-items-center ms-auto gap-3">
                        <span className="text-secondary">
                            {user?.name || 'Usuario'}
                        </span>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => setConfirmOpen(true)}
                        >
                            Cerrar sesión
                        </button>
                    </div>

                </div>
            </nav>

            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Cerrar sesión"
                message="¿Estás seguro de que deseas cerrar sesión?"
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
                variant="danger"
            />
        </>
    );
}

export default Header;
