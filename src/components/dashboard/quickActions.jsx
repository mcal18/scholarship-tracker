import { useNavigate } from "react-router-dom";
import {
    FiPlus,
    FiList,
    FiClock,
    FiAlertCircle
} from "react-icons/fi";
import "../../styles/quickActions.css";

function QuickActions ({
    scholarships,
    onAddScholarship
}) {
    const navigate = useNavigate();

    const highPriorityCount = scholarships.filter(
        scholarship => scholarship.priority === "High"
    ).length;

    const upcomingCount = scholarships.filter (
        scholarship => scholarship.status !== "Won"
    ).length;

    return (
        <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={onAddScholarship}>
                <FiPlus />
                <span>Add Scholarship</span>
            </button>

            <button className="quick-action-btn" onClick={() => navigate("/scholarships")}>
                <FiList />
                <span>View Scholarships</span>
            </button>

            <div className="quick-action-stat">
                <FiClock />
                <span>{upcomingCount} Active Applications</span>
            </div>

            <div className="quick-action-stat">
                <FiAlertCircle />
                <span>{highPriorityCount} High Priority</span>
            </div>
        </div>
    );
}

export default QuickActions;