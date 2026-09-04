import { NavLink } from 'react-router-dom';
import API_ENDPOINTS from '../../api/endpoints';
function Sidebar({ isOpen }) {
    return (
        <aside
            className={`bg-dark text-white p-3 ${
                isOpen ? '' : 'd-none'
            }`}
            style={{ width: '250px', minHeight: '100vh' }}
        >

            <h4 className="mb-4">
                Menú
            </h4>

            <ul className="nav nav-pills flex-column gap-2">


                <li className="nav-item">
                    <NavLink
                        to={API_ENDPOINTS.CATEGORIES.GET_ALL}
                        className="nav-link text-white"
                    >
                        Categorías
                    </NavLink>
                    <NavLink
                        to={API_ENDPOINTS.TAGS.GET_ALL}
                        className="nav-link text-white"
                    >
                        Etiquetas
                    </NavLink>
                </li>

        

            </ul>

        </aside>
    );
}

export default Sidebar;