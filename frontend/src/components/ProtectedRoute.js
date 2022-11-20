import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {() =>
                props.loggedIn ? (<><Component {...props} />
                    <Redirect to="./" /></>) : (<Redirect to="./sign-in" />)
            }
        </Route>
    );
};

export default ProtectedRoute;