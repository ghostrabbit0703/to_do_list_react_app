import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const { login } = useAuth();
    const { success, error: notifyError } = useNotification();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'El correo es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Ingresa un correo válido.';
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
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
            await login({ email, password });
            success('Sesión iniciada correctamente');
            navigate('/categories');
        } catch (error) {
            notifyError(error.message || 'No se pudo iniciar sesión');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body p-4">
                    <h1 className="h4 mb-4 text-center">
                        Iniciar sesión
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="loginEmail"
                                className="form-label"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="loginEmail"
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
                                htmlFor="loginPassword"
                                className="form-label"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="loginPassword"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={submitting}
                                placeholder="Tu contraseña"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={submitting}
                        >
                            {submitting ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <p className="text-center mt-3 mb-0">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
