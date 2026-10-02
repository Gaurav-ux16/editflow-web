import { FormEvent, useState } from "react";

export interface ProjectFormData {
    name: string;
    description: string;
    requirements: string;
    priority: string;
    deadline: string;
}

interface Props {
    onSubmit: (data: ProjectFormData) => void;
}

export default function ClientProjectForm({
    onSubmit,
}: Props) {
    const [form, setForm] = useState<ProjectFormData>({
        name: "",
        description: "",
        requirements: "",
        priority: "medium",
        deadline: "",
    });

    const updateField = (
        field: keyof ProjectFormData,
        value: string
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            className="client-form"
            onSubmit={handleSubmit}
        >
            <div className="client-form-group">
                <label>Project Name</label>

                <input
                    value={form.name}
                    onChange={(event) =>
                        updateField("name", event.target.value)
                    }
                    placeholder="Enter project name"
                    required
                />
            </div>

            <div className="client-form-group">
                <label>Description</label>

                <textarea
                    value={form.description}
                    onChange={(event) =>
                        updateField(
                            "description",
                            event.target.value
                        )
                    }
                    placeholder="Describe your project"
                    rows={4}
                    required
                />
            </div>

            <div className="client-form-group">
                <label>Requirements</label>

                <textarea
                    value={form.requirements}
                    onChange={(event) =>
                        updateField(
                            "requirements",
                            event.target.value
                        )
                    }
                    placeholder="Enter project requirements"
                    rows={5}
                    required
                />
            </div>

            <div className="client-form-row">
                <div className="client-form-group">
                    <label>Priority</label>

                    <select
                        value={form.priority}
                        onChange={(event) =>
                            updateField(
                                "priority",
                                event.target.value
                            )
                        }
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="client-form-group">
                    <label>Expected Deadline</label>

                    <input
                        type="date"
                        value={form.deadline}
                        onChange={(event) =>
                            updateField(
                                "deadline",
                                event.target.value
                            )
                        }
                        required
                    />
                </div>
            </div>

            <div className="client-form-actions">
                <button
                    type="submit"
                    className="client-primary-button"
                >
                    Create Project
                </button>
            </div>
        </form>
    );
}