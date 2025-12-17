import React, { useContext } from 'react';
import { DataContext } from './CreateContext';
import { Navigate } from 'react-router-dom';
import Loading from '../Shared/Loading';

export const ProtectRoute = ({ children }) => {
    const { user,isLoading} = useContext(DataContext);
if(isLoading) {
    return <Loading/>
}
    if (!user) {
        return <Navigate to="/login" />; // must be absolute path
    }

    return children;
};


export const ProtechLogin = ({children})=>{
    const { user,isLoading} = useContext(DataContext)
 if(isLoading) {
    return <Loading/>
}   
if(user){
    return <Navigate to="/admin"/>
}

return children

} 