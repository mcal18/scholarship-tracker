import "../../styles/recentActivity.css"

function RecentActivity({ scholarships }) {
    const recentScholarships = [...scholarships]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div>
            {recentScholarships.length === 0 ? (
                <p>No recent activity yet.</p>
            ) : (
                <div className="activity-list">
                    {recentScholarships.map((scholarship) => (
                        <div
                            key={scholarship.id}
                            className="activity-item"
                        >
                            <div className="activity-left">
                                <div className={`activity-dot status-${scholarship.status
                                        .toLowerCase()
                                        .replace(" ", "-")}`}></div>
                                <strong>{scholarship.scholarshipName}</strong>
                                <p>Status: {scholarship.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentActivity;