import type { ClientProject } from "../types/clientTypes";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

export async function getClientProjects(): Promise<
    ClientProject[]
> {
    const response = await fetch(
        `${API_URL}/projects`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}

export async function getClientProject(
    id: number
): Promise<ClientProject> {
    const response = await fetch(
        `${API_URL}/projects/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project");
    }

    return response.json();
}