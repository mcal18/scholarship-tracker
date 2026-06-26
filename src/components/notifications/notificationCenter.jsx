import "../../styles/notificationCenter.css";
import {
    FiAlertTriangle,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiStar
} from "react-icons/fi";
import { getDaysRemaining } from "../../utils/dateUtils";

function NotificationCenter({ scholarships }) {
    const notifications = [];

    scholarships.forEach((scholarship) => {
        const countdown = getDaysRemaining(
            scholarship.deadline
        );

        if (!countdown) return;
        
        if (countdown.text == "Due Today!") {
            notifications.push({
                type: "urgent",
                icon: <FiClock />,
                title: "Due today",
                message: `${scholarship.scholarshipName} is due today`
            });
        }

        if (
            countdown.text === "3 days left" ||
            countdown.text === "7 days left"
        ) {
            notifications.push({
                type: "warning",
                icon: <FiAlertTriangle />,
                title: "Deadline Approaching",
                message: `${scholarship.scholarshipName} deadline is approaching`
            });
        }

        if (
            countdown.text === "Overdue") {
            notifications.push({
                type: "danger",
                icon: <FiXCircle />,
                title: "Deadline Passed",
                message: `${scholarship.scholarshipName} deadline has passed`
            });
        }

        if (
            scholarship.priority === "High" &&
            scholarship.status === "Not Started"
        ) {
            notifications.push({
                type: "priority",
                icon: <FiStar/>,
                title: "High Priority",
                message: `${scholarship.scholarshipName} is High Priority`
            });
        }
    });

    return (
        <div className="notification-center">
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification-card ${notification.type}`}
                    >
                        <div className="notification-item">
                            <div className="notification-icon">
                                {notification.icon}
                            </div>

                            <div className="notification-content">
                                <strong>{notification.title}</strong>
                                <p>{notification.message}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default NotificationCenter;