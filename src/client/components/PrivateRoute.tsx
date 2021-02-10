import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/api-service';

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => { //children and ...rest are destructured from props. ...rest represents the rest of the props of this component

    const token = localStorage.getItem(TOKEN_KEY) //receive a token when you log in
    if (token) { //if we have a correct token, go to original route path
        return ( //this needs to be dynamic so we can put PrivateRoute on any Route and it will always lead to the correct place
            <Route {...rest}>
                {children}
            </Route>
        )
    } else {
        return (
            <Redirect to='/blogs/login' />
        // Link needs to be clicked on, Redirect happens automatically
        // Redirect is the jsx version of history.push

        )
    }

}


interface PrivateRouteProps {
    exact?: boolean;
    path: string;
    children: React.ReactNode;
}

export default PrivateRoute;

// children is anything inside of the PrivateRoute component
//  <PrivateRoute exact path='/pizza'> <- ...rest passes everything along in the exact path
//      <h1>pizza</h1> <- children 
//  </PrivateRoute>