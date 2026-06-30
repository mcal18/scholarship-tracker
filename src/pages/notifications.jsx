import NotificationCenter from "../components/notifications/notificationCenter";
import { useScholarshipContext } from '../context/scholarshipContext.jsx'; 

function Notifications() { 
  const { scholarships } = useScholarshipContext(); 
  return (
    <>
      <h1>Notifications</h1>
      <NotificationCenter scholarships={scholarships} />
    </>
  );
}
export default Notifications;
