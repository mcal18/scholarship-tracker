import "../../styles/settings.css"

function NotificationSettings({
    notificationSettings,
    setNotificationSettings
}) {

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
                    checked={notificationSettings.upcomingDeadlines}
                    onChange={() => 
                        handleToggle("upcomingDeadlines")
                    }
                    />
                    <span>
                        Upcoming deadlines (30 days)
                    </span>
                </label>

                <label className="settings-toggle">
                    <input 
                    type="checkbox" 
                    checked={notificationSettings.urgentDeadlines}
                    onChange={() => 
                        handleToggle("urgentDeadlines")
                    }
                    />
                    <span>
                        Urgent deadlines (7 days)
                    </span>
                </label>

                <label className="settings-toggle">
                    <input 
                    type="checkbox" 
                    checked={notificationSettings.priorityScholarships}
                    onChange={() => 
                        handleToggle("priorityScholarships")
                    }
                    />
                    <span>
                        High Priority scholarships
                    </span>
                </label>

                <label className="settings-toggle">
                    <input 
                    type="checkbox" 
                    checked={notificationSettings.browserNotifications}
                    onChange={() => 
                        handleToggle("browerNotifications")
                    }
                    />
                    <span>
                        Browser notifications
                    </span>
                </label>
            </div>
        </div>
    );
}

export default NotificationSettings;