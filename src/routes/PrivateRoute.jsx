import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import API_ENDPOINTS from '../api/endpoints';

function PrivateRoute({ children }) {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={API_ENDPOINTS.AUTH.LOGIN} replace />;
    }

    return children;
}

export default PrivateRoute;
