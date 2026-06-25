import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

function StatusAnalytics ({scholarships = []}) {
    const data = [
        {
            name: "Won",
            value: scholarships.filter (
                s => s.status === "Won"
            ).length
        },

        {
            name: "Submitted",
            value: scholarships.filter (
                s => s.status === "Submitted"
            ).length
        },

        {
            name: "In Progress",
            value: scholarships.filter (
                s => s.status === "In Progress"
            ).length
        },

        {
            name: "Not Started",
            value: scholarships.filter (
                s => s.status === "Not Started"
            ).length
        }
    ];

    const COLORS = [
        "#22C55e",
        "#3b82f6",
        "#f5930b",
        "#ef4444"
    ];

    return (
        <div className="dashboard-card">
            <h2>Status Breakdown</h2>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie 
                    data={data} 
                    dataKey="value"
                    outerRadius={90}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatusAnalytics;