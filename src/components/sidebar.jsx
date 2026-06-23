import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <NavLink to="/">Dashboard</NavLink>

            <NavLink to="/schoalrships">Scholarships</NavLink>

            <NavLink to="/Calendar">Calendar</NavLink>

            <NavLink to="/analytics">Analytics</NavLink>

            <NavLink to="/settings">Settings</NavLink>
        </aside>
    );
}

export default Sidebar;