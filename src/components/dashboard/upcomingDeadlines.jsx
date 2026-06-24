import "../../styles/upcomingDeadlines.css"
import React from 'react';
import { formatDate, getDaysRemaining } from '../../utils/dateUtils';

function UpcomingDeadlines({ scholarships }) {
    const upcoming = [...scholarships]
        .filter(scholarship => new Date(scholarship.deadline) >= new Date())
        .sort((a, b) => Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);

    return (
        <>
            {upcoming.length === 0 ? (
                <p>No upcoming deadlines.</p>
            ) : (
                upcoming.map((scholarship) => {
                    const countdown = getDaysRemaining(scholarship.deadline);

                    return (
                        <div key={scholarship.id} className="deadline-item">
                            <div className="deadline-top">
                                <h3>{scholarship.scholarshipName}</h3>
                                <span className={`deadline-countdown ${countdown.className}`}>{countdown.text}</span>

                            </div>


                            <div className="deadline-bottom">
                                <p>{formatDate(scholarship.deadline)}</p>
                                <p>Status: {scholarship.status}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    )
}

export default UpcomingDeadlines;