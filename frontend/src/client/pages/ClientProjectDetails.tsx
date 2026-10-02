import { useParams, useNavigate } from "react-router-dom";
import ClientStatusBadge from "../components/ClientStatusBadge";
import { clientProjects } from "../data/clientMockData";

const priorityLabels: Record<string, string> = {
    low: "Low Priority",
    medium: "Medium Priority",
    high: "High Priority",
};

export default function ClientProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = clientProjects.find(
        (item) => item.id === Number(id)
    );

    if (!project) {
        return (
            <div className="client-empty-state">
                <h2>Project not found</h2>
                <p>The requested project does not exist.</p>
                <button
                    className="client-primary-button"
                    style={{ marginTop: "14px" }}
                    onClick={() => navigate("/client/projects")}
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div>
            <section className="client-page-header">
                <div>
                    <p className="client-eyebrow">PROJECT DETAILS</p>
                    <h1>{project.name}</h1>
                    {project.clientName && (
                        <p style={{ color: "#006ecf", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>
                            {project.clientName}
                        </p>
                    )}
                    <p>{project.description}</p>
                </div>

                <div className="client-badge-row">
                    <ClientStatusBadge status={project.status} />
                    <span className={`client-priority-badge client-priority-${project.priority}`}>
                        {priorityLabels[project.priority] || project.priority}
                    </span>
                </div>
            </section>

            <div className="client-detail-grid">
                <div className="client-detail-card">
                    <span>Manager</span>
                    <strong>{project.manager}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Editor</span>
                    <strong>{project.editor || "Not assigned"}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Start Date</span>
                    <strong>{project.startDate}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Deadline</span>
                    <strong>{project.deadline}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Deliverables</span>
                    <strong>{project.deliverables ?? project.totalTasks}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Budget</span>
                    <strong>{project.budget || "—"}</strong>
                </div>

                <div className="client-detail-card">
                    <span>Tasks Completed</span>
                    <strong>
                        {project.tasksCompleted}/{project.totalTasks}
                    </strong>
                </div>

                <div className="client-detail-card">
                    <span>Last Updated</span>
                    <strong>{project.lastUpdated || "Recently"}</strong>
                </div>
            </div>

            <section className="client-detail-section">
                <h2>Project Progress</h2>

                <div className="client-large-progress">
                    <div
                        style={{
                            width: `${project.progress}%`,
                        }}
                    />
                </div>

                <strong>{project.progress}% complete</strong>
            </section>

            <section className="client-detail-section">
                <h2>Requirements</h2>
                <p>{project.requirements}</p>
            </section>
        </div>
    );
}