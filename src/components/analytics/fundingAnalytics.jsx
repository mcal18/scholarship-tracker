function FundingAnalytics ({scholarships = []}) {
    const amounts = scholarships.map (
        s => Number(s.amount) || 0 
    );

    const total =  
        amounts.reduce((a,b) => a + b, 0);

    const average =
        scholarships.length
            ? total / scholarships.length
            : 0;
    const highest =
        Math.max(...amounts, 0);

    return (
        <div className="dashboard-card">
            <h2>Funding Insights</h2>

            <p>Total Funding:
                <strong>
                    ${total.toLocaleString()}
                </strong>
            </p>

            <p>
                Average Award:
                <strong>
                    ${Math.round(average).toLocaleString()}
                </strong>
            </p>

            <p>
                Largest Scholarship:
                <strong>
                    ${highest.toLocaleString()}
                </strong>
            </p>
        </div>
    );
}

export default FundingAnalytics;