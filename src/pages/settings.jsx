import "../styles/settings.css"
import DataSettings from "../components/settings/dataSettings";
import ThemeSettings from "../components/settings/themeSettings";
import NotificationSettings from "../components/settings/notificationSettings";

function Settings({
    scholarships,
    setScholarships
}) {
    return (
        <>
            <h1>Settings</h1>

            <div className="settings-grid">
                <DataSettings
                    scholarships={scholarships}
                    setScholarships={setScholarships}
                />

                <ThemeSettings />
                <NotificationSettings />
            </div>
        </>
    );
}
export default Settings;