function StatsPanel({scholarships}) {
    const totalCount = scholarships.length;

    // Calculates how man scholarships are in each status category
    const wonCount = scholarships.filter(s => s.status === 'Won').length;
    const inProgressCount = scholarships.filter(s => s.status === 'In Progress').length;
    const submittedCount = scholarships.filter(s => s.status === 'Submitted').length;
    const notStartedCount = scholarships.filter(s => s.status === 'Not Started').length;
    
    //Calculates percentage ratios for the loading tracker bars
    const getPercentage = (count) => {
        if (totalCount === 0) return 0;
        return Math.round((count / totalCount) * 100);
    };

    return (
    <div className="stats-panel">
        <span className="stats-title">📊 Application Statistics</span>

        <div className="stats-rows-container">
            <div className="stats-row">
                <div className="stats-row-info">
                    <span>Won 🏆</span>
                    <span>{wonCount} ({getPercentage(wonCount)}%)</span>
                </div>
                <div className="stats-bar-bg">
                    <div className="stats-bar-fill fill-won" style={{width: `${getPercentage(wonCount)}%`}}/>
                </div>
            </div>

        <div className="stats-row">
                <div className="stats-row-info">
                    <span>In Progress ⏳</span>
                    <span>{inProgressCount} ({getPercentage(inProgressCount)}%)</span>
                </div>
                <div className="stats-bar-bg">
                    <div className="stats-bar-fill fill-progress" style={{width: `${getPercentage(inProgressCount)}%`}}/>
                </div>
            </div>

        <div className="stats-row">
                <div className="stats-row-info">
                    <span>Submitted 🚀</span>
                    <span>{submittedCount} ({getPercentage(submittedCount)}%)</span>
                </div>
                <div className="stats-bar-bg">
                    <div className="stats-bar-fill fill-submitted" style={{width: `${getPercentage(submittedCount)}%`}}/>
                </div>
            </div>

        <div className="stats-row">
                <div className="stats-row-info">
                    <span>Not Started 🛑</span>
                    <span>{notStartedCount} ({getPercentage(notStartedCount)}%)</span>
                </div>
                <div className="stats-bar-bg">
                    <div className="stats-bar-fill fill-notstarted" style={{width: `${getPercentage(notStartedCount)}%`}}/>
                </div>
            </div>

        </div>
    </div>
);
}

export default StatsPanel;