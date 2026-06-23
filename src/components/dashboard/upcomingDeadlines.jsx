import React from 'react';
import { formatDate, getDaysRemaining } from '../../utils/dateUtils';

function UpcomingDeadlines ({scholarships}) {
    const upcoming = [...scholarships]
        .filter(scholarship => new Date(scholarship.deadline) >= new Date())
        .sort((a,b) => Date (a.deadline) - new Date(b.deadline))
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
                            <h4>{scholarship.scholarshipName}</h4>
                            <p>{formatDate(scholarship.deadline)}</p>
                            <p className={countdown.className}>{countdown.text}</p>
                            <p>Status: {scholarship.status}</p>
                        </div>
                    );
                })
            )}
        </>
    )
}

export default UpcomingDeadlines;