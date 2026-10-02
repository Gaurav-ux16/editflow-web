import { Routes, Route, Navigate } from "react-router-dom";

import ClientLayout from "./components/ClientLayout";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProjects from "./pages/ClientProjects";
import ClientCreateProject from "./pages/ClientCreateProject";
import ClientProjectDetails from "./pages/ClientProjectDetails";
import "./styles/client.css";

export default function ClientRoutes() {
    return (
        <Routes>
            <Route element={<ClientLayout />}>
                <Route
                    index
                    element={
                        <Navigate to="/client/dashboard" replace />
                    }
                />

                <Route
                    path="dashboard"
                    element={<ClientDashboard />}
                />

                <Route
                    path="projects"
                    element={<ClientProjects />}
                />

                <Route
                    path="projects/create"
                    element={<ClientCreateProject />}
                />

                <Route
                    path="projects/:id"
                    element={<ClientProjectDetails />}
                />
            </Route>
        </Routes>
    );
}