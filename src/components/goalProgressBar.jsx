import "../styles/goalProgreesBar.css";

function GoalProgressBar ({ scholarships, profile }) {
    const goalAmount = Number(profile?.scholarshipGoal) || 0;

    const activeScholarships = scholarships || [];
    const totalWon = activeScholarships
        .filter(item => item.status === "Won")
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const progressPercent = goalAmount > 0
        ? Math.min(Math.round((totalWon / goalAmount) * 100 ), 100)
        : 0;

    return (
        <div className="dashboard-card progress-card">
            <h2>Funding Goal Progress</h2>
            <div className="progress-metrics">
                <span className="metrics-secured">${totalWon.toLocaleString()} secured</span>
                <span className="metrics-target">of ${goalAmount.toLocaleString()} goal</span>
            </div>
            <div className="progress-bar-container">
                <div 
                className="progress-bar-fill"
                style={{width: `${progressPercent}%`}} />
            </div>
            <div className="progress-percentage">{progressPercent}% Completed</div>
        </div>
    );
}

export default GoalProgressBar;