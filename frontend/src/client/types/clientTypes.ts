export type ProjectStatus =
    | "pending"
    | "in_progress"
    | "completed";

export type ProjectPriority =
    | "low"
    | "medium"
    | "high";

export interface ClientProject {
    id: number;
    name: string;
    image?: string;
    clientName?: string;
    description: string;
    requirements: string;
    manager: string;
    editor?: string;
    startDate: string;
    deadline: string;
    deliverables?: number;
    budget?: string;
    progress: number;
    status: ProjectStatus;
    priority: ProjectPriority;
    tasksCompleted: number;
    totalTasks: number;
    lastUpdated?: string;
}