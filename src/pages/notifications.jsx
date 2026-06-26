import NotificationCenter from "../components/notifications/notificationCenter";

function Notifications({scholarships}) {
    return (
        <>
            <h1>Notifications</h1>
            <NotificationCenter
                scholarships={scholarships}
            />
        </>
    );
}

export default Notifications;