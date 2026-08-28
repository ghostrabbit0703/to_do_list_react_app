import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

function MainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className="d-flex min-vh-100 w-100">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-grow-1 min-vh-100 overflow-hidden">

                <Header
                    onToggleSidebar={toggleSidebar}
                />

                <main className="container-fluid p-3 p-md-4">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;