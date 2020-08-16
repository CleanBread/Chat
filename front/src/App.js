import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Auth, Home } from 'pages'

function App() {
	const isAuth = useSelector(({ user }) => {
		// return user.isAuth
		return user.token
	})

	return (
		<div className="wrapper">
			<Route exact path={['/', '/login', '/register', '/verify']} render={() => (isAuth ? <Redirect to="/dialogs" /> : <Auth />)} />
			<Route path={['/dialogs', '/dialogs:id']} render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
		</div>
	);
}

export default App;
