import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import API_ENDPOINTS from '../api/endpoints';
function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const { register } = useAuth();
    const { success, error: notifyError } = useNotification();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
        }

        if (!email.trim()) {
            newErrors.email = 'El correo es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Ingresa un correo válido.';
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }

        if (!passwordConfirmation) {
            newErrors.passwordConfirmation = 'Confirma la contraseña.';
        } else if (password !== passwordConfirmation) {
            newErrors.passwordConfirmation = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        try {
            await register({ name, email, password });
            success('Cuenta creada correctamente');
            navigate(API_ENDPOINTS.CATEGORIES.GET_ALL);
        } catch (error) {
            notifyError(error.message || 'No se pudo registrar la cuenta');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body p-4">
                    <h1 className="h4 mb-4 text-center">
                        Crear cuenta
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="registerName"
                                className="form-label"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="registerName"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={submitting}
                                placeholder="Tu nombre"
                            />
                            {errors.name && (
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="registerEmail"
                                className="form-label"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="registerEmail"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={submitting}
                                placeholder="tucorreo@ejemplo.com"
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="registerPassword"
                                className="form-label"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={submitting}
                                placeholder="Mínimo 8 caracteres"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="registerPasswordConfirmation"
                                className="form-label"
                            >
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="registerPasswordConfirmation"
                                className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
                                value={passwordConfirmation}
                                onChange={(event) => setPasswordConfirmation(event.target.value)}
                                disabled={submitting}
                                placeholder="Repite tu contraseña"
                            />
                            {errors.passwordConfirmation && (
                                <div className="invalid-feedback">
                                    {errors.passwordConfirmation}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={submitting}
                        >
                            {submitting ? 'Registrando...' : 'Registrarme'}
                        </button>
                    </form>

                    <p className="text-center mt-3 mb-0">
                        ¿Ya tienes cuenta?{' '}
                        <Link to={API_ENDPOINTS.LOGIN}>
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
