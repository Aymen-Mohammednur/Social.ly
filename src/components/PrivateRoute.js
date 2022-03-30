import { Navigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';


function PrivateRoute({ children }) {
    const { isAuthed } = useAuth()
    return isAuthed === true ? children : <Navigate to="/login" />;
}

export default PrivateRoute