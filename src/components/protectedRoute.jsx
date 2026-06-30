import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({children}) {
    const {user, authLoading} = useAuth();
    const location = useLocation();

    if(authLoading) {
        return (
            <div className="protected-loader-container">
                <div className="protected-spinner" />
                    <p>Loading application workspace...</p>
            </div>
        );
    }

    if(!user) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children
}

export default ProtectedRoute;