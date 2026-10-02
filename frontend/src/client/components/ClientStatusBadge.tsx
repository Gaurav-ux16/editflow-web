import type { ProjectStatus } from "../types/clientTypes";

interface Props {
    status: ProjectStatus;
}

const statusText: Record<ProjectStatus, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
};

export default function ClientStatusBadge({ status }: Props) {
    return (
        <span className={`client-status-badge client-status-${status}`}>
            {statusText[status]}
        </span>
    );
}