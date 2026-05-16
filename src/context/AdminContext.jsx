import {AuthContext} from "./AuthContext";
import { useContext } from "react";
import {Navigate} from "react-router-dom";
function AdminRoute({children}){
    const {user} = useContext(AuthContext);
    if(user && user.role==="admin"){
        return children;
    }
    return <Navigate to="/login" />;
}
export default AdminRoute;
