import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Auth, Home } from 'pages'

function App() {
	const isAuth = useSelector(({ user }) => {
		return user.isAuth
	})

	return (
		<div className="wrapper">
			<Route exact path={['/', '/login', '/register']} component={Auth} />
			<Route exact path="/im" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
		</div>
	);
}

export default App;
