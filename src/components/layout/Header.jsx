import { useContext } from 'react';

function Header({ onToggleSidebar }) {
 

    return (
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
              

            </div>
        </nav>
    );
}

export default Header;