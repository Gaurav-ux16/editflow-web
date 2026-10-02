interface Props {
    title: string;
    value: number;
    description: string;
}

export default function ClientStatCard({
    title,
    value,
    description,
}: Props) {
    return (
        <div className="client-stat-card">
            <div>
                <p className="client-stat-title">{title}</p>
                <h2>{value}</h2>
                <p className="client-stat-description">{description}</p>
            </div>
        </div>
    );
}