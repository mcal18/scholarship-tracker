import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function PriorityAnalytics({scholarships = []}) {
    const data = [
        {
            priority: "High",
            count: scholarships.filter(
                s => s.priority === "High"
            ).length
        }, 

        {
            priority: "Medium",
            count: scholarships.filter(
                s => s.priority === "Medium"
            ).length
        }, 

        {
            priority: "Low",
            count: scholarships.filter(
                s => s.priority === "Low"
            ).length
        }
    ];

    return (
        <div className="dashboard-card">
            <h2>Priority Distribution</h2>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="priority" />
                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar 
                        dataKey="count"
                        fill="#4f46e5"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PriorityAnalytics;