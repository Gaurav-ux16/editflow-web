import type { ClientProject } from "../types/clientTypes";

interface Props {
    project: ClientProject;
    onView: (id: number) => void;
}

const statusText: Record<string, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
};

const priorityText: Record<string, string> = {
    low: "Low Priority",
    medium: "Medium Priority",
    high: "High Priority",
};

export default function ClientCard({ project, onView }: Props) {
    return (
        <div className="client-project-card">
            {project.image && (
                <img src={project.image} alt={project.name} className="company-image" />
            )}

            <h3 className="project-title">{project.name}</h3>

            {project.clientName && (
                <p className="project-company">{project.clientName}</p>
            )}

            <p className="project-description">{project.description}</p>

            <div className="badge-container">
                <span className={`status status-${project.status}`}>
                    {statusText[project.status] || project.status}
                </span>

                <span className={`priority priority-${project.priority}`}>
                    {priorityText[project.priority] || project.priority}
                </span>
            </div>

            <hr className="divider" />

            <div className="details">
                <div className="detail-item">
                    <span className="label">Manager</span>
                    <span className="value">{project.manager}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Editor</span>
                    <span className="value">{project.editor || "Not assigned"}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Start Date</span>
                    <span className="value">{project.startDate}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Deadline</span>
                    <span className="value">{project.deadline}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Deliverables</span>
                    <span className="value">{project.deliverables ?? project.totalTasks}</span>
                </div>

                <div className="detail-item">
                    <span className="label">Budget</span>
                    <span className="value">{project.budget || "—"}</span>
                </div>
            </div>

            <div className="progress-section">
                <div className="progress-header">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                </div>

                <div className="progress">
                    <div
                        className="progress-bar"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            {project.lastUpdated && (
                <p className="last-updated">Last updated: {project.lastUpdated}</p>
            )}

            <button
                className="view-button"
                onClick={() => onView(project.id)}
            >
                View Project
            </button>
        </div>
    );
}