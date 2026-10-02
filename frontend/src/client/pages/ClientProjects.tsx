import { useNavigate } from "react-router-dom";
import ClientCard from "../components/ClientCard";
import { clientProjects } from "../data/clientMockData";

export default function ClientProjects() {
    const navigate = useNavigate();

    return (
        <div>
            <section className="client-page-header">
                <div>
                    <p className="client-eyebrow">PROJECTS</p>

                    <h1>All Projects</h1>

                    <p>
                        View and track all projects submitted by you.
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

            <div className="client-filter-bar">
                <input
                    className="client-search-input"
                    placeholder="Search projects..."
                />

                <select className="client-select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>

            <div className="client-project-grid">
                {clientProjects.map((project) => (
                    <ClientCard
                        key={project.id}
                        project={project}
                        onView={(id) =>
                            navigate(`/client/projects/${id}`)
                        }
                    />
                ))}
            </div>
        </div>
    );
}