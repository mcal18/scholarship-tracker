import { FiUser, FiBookOpen } from "react-icons/fi"
import "../styles/dashboard.css"
import TotalTracker from '../components/TotalTracker';
import StatsPanel from '../components/statsPanel';
import UpcomingDeadlines from '../components/dashboard/upcomingDeadlines';
import MonthlyCharts from '../components/dashboard/monthlyCharts';
import RecentActivity from '../components/dashboard/recentActivity';
import QuickActions from "../components/dashboard/quickActions";
import GoalProgressBar from "../components/goalProgressBar";
import { generateDashboardMessage } from '../utils/generateDashboardMessage';
import { useScholarshipContext } from "../context/scholarshipContext";

function Dashboard() {
  const { scholarships, totalScholarshipMoney, handleAddButton, profile } = useScholarshipContext();
  const insights = generateDashboardMessage(profile, scholarships);

  return (
    <>
      <div className="dashboard-card personalized-card">
        <h2> ✨ Personalized Insights </h2>
        {typeof insights === "string" ? (
          <p>{insights}</p>
        ) : (
          <div className="personalized-list">
            <div className="personalized-list-title">
              <FiUser className="personalized-icon" />
              <div className="greeting" >
                <h2>{insights?.greeting}</h2>
              </div>
            </div>
            <div className="personalized-item">
              <FiBookOpen className="personalized-icon" />
              <div>
                <strong>Academic Advice</strong>
                <p>{insights?.majorAdvice}</p>
              </div>
            </div>
            <div className="personalized-item">
              <FiUser className="personalized-icon" />
              <div>
                <strong>Funding Goal</strong>
                <p>{(insights?.totalAmount ?? 0).toLocaleString()}{" / "}${(insights?.goal ?? 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
        <div className="dashboard-motivation">
          {insights?.highPriorityCount > 0 ? "🔥 Focus on your high-priority scholarships this week." : "🚀 Great job staying on top of your applications."}
        </div>
        <div className="recommendation-tags">
          {insights?.recommendedCategories?.map( category => (
            <span key={category} className="recommendation-tag">
              {category}
            </span>
          ) )}
        </div>
      </div>
      <div className="dashboard-page">
        <div className="summary-container">
          <StatsPanel scholarships={scholarships} />
          <TotalTracker totalMoney={totalScholarshipMoney} />
          <GoalProgressBar scholarships={scholarships} profile={profile} />
        </div>
        <div className="dashboard-grid">
          <section className="dashboard-card upcoming-deadlines">
            <h2>Upcoming Deadlines</h2>
            <UpcomingDeadlines scholarships={scholarships} />
          </section>
          <section className="dashboard-card monthly-chart">
            <h2>Monthly Deadlines Chart</h2>
            <MonthlyCharts scholarships={scholarships} />
          </section>
          <section className="dashboard-card recent-activity">
            <h2>Recent Activity</h2>
            <RecentActivity scholarships={scholarships} />
          </section>
          <section className="dashboard-card quick-actions">
            <h2>Quick Actions</h2>
            <QuickActions scholarships={scholarships} onAddScholarship={handleAddButton} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
