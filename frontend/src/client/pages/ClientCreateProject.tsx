import { useNavigate } from "react-router-dom";
import ClientProjectForm, {
    type ProjectFormData,
} from "../components/ClientProjectForm";

export default function ClientCreateProject() {
    const navigate = useNavigate();

    const handleCreateProject = (
        data: ProjectFormData
    ) => {
        console.log("Project submitted:", data);

        // API integration will be connected here later.

        navigate("/client/projects");
    };

    return (
        <div>
            <section className="client-page-header">
                <div>
                    <p className="client-eyebrow">
                        PROJECT MANAGEMENT
                    </p>

                    <h1>Create Project</h1>

                    <p>
                        Provide the requirements and details for
                        your new project.
                    </p>
                </div>
            </section>

            <div className="client-form-card">
                <ClientProjectForm
                    onSubmit={handleCreateProject}
                />
            </div>
        </div>
    );
}