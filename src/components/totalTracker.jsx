import { RiMoneyDollarCircleLine } from 'react-icons/ri';

function TotalTracker({ totalMoney }) {
  return (
    <div className="total-tracker-card">
      <span className='info-label'>
        <RiMoneyDollarCircleLine /> Total Potential Funding
      </span>
      <div className="amount-value">
        ${totalMoney.toLocaleString()}
      </div>
    </div>
  );
}

export default TotalTracker;
