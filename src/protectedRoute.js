import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const users = useSelector((state) => state.userReducer);
    // console.log(users);
    const user = users.find(user => user.isSignedIn == true);
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (!user) {
                        return <Redirect to="/login" />;
                    }
                    return <Component {...props} />;
                }}
            />
        </>
    );
};

export default ProtectedRoute;
