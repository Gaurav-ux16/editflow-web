import { useNavigate } from "react-router-dom";
import ClientCard from "../components/ClientCard";
import ClientStatCard from "../components/ClientStatCard";
import { clientProjects } from "../data/clientMockData";

export default function ClientDashboard() {
    const navigate = useNavigate();

    const activeProjects = clientProjects.filter(
        (project) => project.status === "in_progress"
    ).length;

    const pendingProjects = clientProjects.filter(
        (project) => project.status === "pending"
    ).length;

    const completedProjects = clientProjects.filter(
        (project) => project.status === "completed"
    ).length;

    return (
        <div>
            <section className="client-page-header">
                <div>
                    <p className="client-eyebrow">
                        CLIENT DASHBOARD
                    </p>

                    <h1>Good morning, Client</h1>

                    <p>
                        Here's an overview of your projects and
                        current progress.
                    </p>
                </div>

                <button
                    className="client-primary-button"
                    onClick={() =>
                        navigate("/client/projects/create")
                    }
                >
                    + Create Project
                </button>
            </section>

            <section className="client-stats-grid">
                <ClientStatCard
                    title="Active Projects"
                    value={activeProjects}
                    description="Currently in progress"
                />

                <ClientStatCard
                    title="Pending Projects"
                    value={pendingProjects}
                    description="Waiting to begin"
                />

                <ClientStatCard
                    title="Completed"
                    value={completedProjects}
                    description="Successfully completed"
                />
            </section>

            <section className="client-section">
                <div className="client-section-header">
                    <div>
                        <h2>Your Projects</h2>
                        <p>Track your active and recent projects.</p>
                    </div>

                    <button
                        className="client-link-button"
                        onClick={() =>
                            navigate("/client/projects")
                        }
                    >
                        View all →
                    </button>
                </div>

                <div className="client-project-grid">
                    {clientProjects.slice(0, 3).map((project) => (
                        <ClientCard
                            key={project.id}
                            project={project}
                            onView={(id) =>
                                navigate(`/client/projects/${id}`)
                            }
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}