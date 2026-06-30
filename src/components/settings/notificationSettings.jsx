import "../../styles/settings.css";
import { useScholarshipContext } from '../../context/scholarshipContext.jsx'; 

function NotificationSettings() { 
  const { notificationSettings, setNotificationSettings } = useScholarshipContext();

  const handleToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="dashboard-card">
      <h2>Notifications</h2>
      <p>
        Choose which scholarship reminders and alerts you want to receive.
      </p>
      <div className="setting-options">
        <label className="settings-toggle">
          <input 
            type="checkbox" 
            checked={!!notificationSettings.emailAlerts} 
            onChange={() => handleToggle("emailAlerts")} 
          />
          <span> Email Alerts </span>
        </label>
        
        <label className="settings-toggle">
          <input 
            type="checkbox" 
            checked={!!notificationSettings.deadlineReminders} 
            onChange={() => handleToggle("deadlineReminders")} 
          />
          <span> Deadline Reminders </span>
        </label>
      </div>
    </div>
  );
}

export default NotificationSettings;
