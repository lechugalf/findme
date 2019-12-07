import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

function ProtectedRoute({ children, ...rest }) {
	
	const auth = useSelector(state => state.firebase.auth);

	return (
		<Route
			{...rest}
			render={({location}) => 
				isLoaded(auth) && !isEmpty(auth) ? (
					children
				)	: (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);

}

export default ProtectedRoute;
