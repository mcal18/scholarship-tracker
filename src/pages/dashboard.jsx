import TotalTracker from '../components/TotalTracker';
import StatsPanel from '../components/statsPanel';
import UpcomingDeadlines from '../components/dashboard/upcomingDeadlines';
import MonthlyCharts from '../components/dashboard/monthlyCharts';

function Dashboard({
    scholarships,
    totalScholarshipMoney }) {
    return (
        <>
            <div className="dashboard-page">
                <div className="summary-container">
                    <StatsPanel scholarships={scholarships} />
                    <TotalTracker totalMoney={totalScholarshipMoney} />
                </div>

                <div className="dashboard-grid">
                    <section className="dashboard-card upcoming-deadlines">
                        <h2>Upcoming Deadlines</h2>
                        <UpcomingDeadlines scholarships={scholarships}/>
                    </section>

                    <section className="dashboard-card monthly-chart">
                        <h2>Monthly Deadlines Chart</h2>
                        <MonthlyCharts scholarships={scholarships} />
                    </section>

                    <section className="dashboard-card recent-activity">
                        <h2>Recent Activity</h2>
                    </section>

                    <section className="dashboard-card quick-actions">
                        <h2>Quick Actions</h2>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Dashboard;