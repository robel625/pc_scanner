import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const PrivateRoutes = () => {
    const { auth } = useSelector((state) => state);

    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes