import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function MonthlyCharts({ scholarships }) {
    const monthCounts = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
    };

    scholarships.forEach((scholarship) => {
        if (!scholarship.deadline) return;

        const date = new Date(scholarship.deadline);

        const month = date.toLocaleDateString("en-US", {
            month: "short",
        });

        monthCounts[month]++;
    });

    const chartData = Object.entries(monthCounts).map(([month, count]) => ({
        month,
        applications: count,
    }));

    return (
        <div>
            <h3>Applications by Deadline Month</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />

                    <Bar
                        dataKey="applications"
                        fill="#4F46E5"
                        radius={[5, 5, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyCharts;