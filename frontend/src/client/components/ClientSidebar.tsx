import { NavLink } from "react-router-dom";

export default function ClientSidebar() {
    return (
        <aside className="client-sidebar">
            <div className="client-logo">
                <div className="client-logo-mark">E</div>
                <span>EditFlow</span>
            </div>

            <nav className="client-navigation">
                <NavLink to="/client/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/client/projects">
                    Projects
                </NavLink>

                <NavLink to="/client/projects/create">
                    Create Project
                </NavLink>
            </nav>

            <div className="client-sidebar-bottom">
                <div className="client-user-small">
                    <div className="client-avatar">C</div>

                    <div>
                        <strong>Client User</strong>
                        <span>Client</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}