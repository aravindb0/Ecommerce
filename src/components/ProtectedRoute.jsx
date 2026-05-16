import {AuthContext} from "../context/AuthContext";
import { useContext, useState } from "react";
import {Navigate} from "react-router-dom";
function ProtectedRoute({children}){
    const {user} = useContext(AuthContext);
    if(!user){
       return <Navigate to="/login" />;
    }
    return children;    
}
export default ProtectedRoute;