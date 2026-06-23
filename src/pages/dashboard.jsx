import TotalTracker from '../components/TotalTracker';
import StatsPanel from '../components/statsPanel';
function Dashboard({
    scholarships,
    totalScholarshipMoney}) 
    {
    return (
        <>
            <h1>Dashboard</h1>

            <div className="summary-container">
                <StatsPanel scholarships={scholarships} />
                <TotalTracker totalMoney={totalScholarshipMoney} />
            </div>
        </>
    );
}

export default Dashboard;