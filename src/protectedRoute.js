import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const users = useSelector((state) => state.userReducer);
    const user = users.find(user => user.isSignedIn == true);
    if (user != undefined) {
        console.log(Object.keys(user).length > 0);
    }
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    return <Component {...props} />;
                    if (user && Object.keys(user).length > 0) {
                    } else
                        return <Redirect to="/login" />;
                }}
            />
        </>
    );
};

export default ProtectedRoute;
