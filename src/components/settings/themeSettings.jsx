import { useState, useEffect } from "react";
import "../../styles/themeSettings.css";

function ThemeSettings() {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="dashboard-card">
            <h2>Theme & Appearance</h2>
            <p className="settings-description">
                Customize the appearance of ScholarTrack.
            </p>

            <div className="theme-options">
                <button
                    className={theme === "dark" ? "active-theme" : ""}
                    onClick={() => setTheme("dark")}
                >
                    🌙 Dark
                </button>

                <button
                    className={theme === "light" ? "active-theme" : ""}
                    onClick={() => setTheme("light")}
                >
                    ☀️ Light
                </button>
            </div>
        </div>
    );
}

export default ThemeSettings;