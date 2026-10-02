import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClientSidebar from "./ClientSidebar";

export default function ClientLayout() {
    return (
        <div className="client-app">
            <ClientSidebar />

            <div className="client-main">
                <ClientNavbar />

                <main className="client-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}