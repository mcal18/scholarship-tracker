import "../styles/settings.css"
import DataSettings from "../components/settings/dataSettings";
import ThemeSettings from "../components/settings/themeSettings";
import NotificationSettings from "../components/settings/notificationSettings";
import ProfileSettings from "../components/settings/profileSettings";

function Settings({
    scholarships,
    setScholarships,
    notificationSettings,
    setNotificationSettings,
    profile,
    setProfile
}) {
    return (
        <>
            <h1>Settings</h1>

            <div className="settings-grid">
                <ProfileSettings
                    profile={profile}
                    setProfile={setProfile}
                />
                <DataSettings
                    scholarships={scholarships}
                    setScholarships={setScholarships}
                />

                <ThemeSettings />
                <NotificationSettings 
                    notificationSettings={notificationSettings}
                    setNotificationSettings={setNotificationSettings}
                />
            </div>
        </>
    );
}
export default Settings;