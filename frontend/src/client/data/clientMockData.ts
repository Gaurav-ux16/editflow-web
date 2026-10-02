import type { ClientProject } from "../types/clientTypes";

export const clientProjects: ClientProject[] = [
    {
        id: 1,
        name: "Website Redesign",
        image: "/images/max.jpg",
        clientName: "ABC Productions",
        description:
            "Redesign the company website with a cleaner and responsive interface.",
        requirements:
            "Responsive design, updated navigation, project pages and contact section.",
        manager: "Rahul Sharma",
        editor: "Aditya Patil",
        startDate: "20 Sep 2026",
        deadline: "15 Oct 2026",
        deliverables: 4,
        budget: "₹25,000",
        progress: 75,
        status: "in_progress",
        priority: "high",
        tasksCompleted: 6,
        totalTasks: 8,
        lastUpdated: "2 hours ago",
    },
    {
        id: 2,
        name: "Marketing Campaign",
        clientName: "XYZ Media",
        description:
            "Prepare digital marketing material for the upcoming campaign.",
        requirements:
            "Social media creatives, campaign documents and final review.",
        manager: "Aditi Patil",
        editor: "Rohan Verma",
        startDate: "03 Oct 2026",
        deadline: "20 Oct 2026",
        deliverables: 6,
        budget: "₹40,000",
        progress: 45,
        status: "in_progress",
        priority: "medium",
        tasksCompleted: 4,
        totalTasks: 9,
        lastUpdated: "4 hours ago",
    },
    {
        id: 3,
        name: "Internal Portal",
        clientName: "Global Tech",
        description:
            "Development of an internal employee management portal.",
        requirements:
            "Employee dashboard, profile management and reporting modules.",
        manager: "Rohit Kulkarni",
        editor: "Sneha Nair",
        startDate: "10 Sep 2026",
        deadline: "30 Sep 2026",
        deliverables: 10,
        budget: "₹65,000",
        progress: 100,
        status: "completed",
        priority: "low",
        tasksCompleted: 10,
        totalTasks: 10,
        lastUpdated: "1 day ago",
    },
];