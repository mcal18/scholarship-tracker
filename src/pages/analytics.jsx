import "../styles/analytics.css"
import StatusAnalytics from "../components/analytics/statusAnalytics";
import FundingAnalytics from "../components/analytics/fundingAnalytics";
import PriorityAnalytics from "../components/analytics/priorityAnalytics";
import { useScholarshipContext } from '../context/scholarshipContext.jsx'; 

function Analytics() {
  const { scholarships } = useScholarshipContext(); 
  return(
    <>
      <h1>Analytics</h1>
      <div className="analytics-grid">
        <StatusAnalytics scholarships={scholarships} />
        <FundingAnalytics scholarships={scholarships} />
        <PriorityAnalytics scholarships={scholarships} />
      </div>
    </>
  );
}
export default Analytics;
