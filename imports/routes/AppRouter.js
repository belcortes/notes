import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const history = createHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];


export const onAuthChange = (isAuthenticated) => {
	const pathName = history.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
	const isAuthenticatedPage = authenticatedPages.includes(pathName);

	if(isUnauthenticatedPage && isAuthenticated) {
		history.push('/dashboard')
	} else if ( isAuthenticatedPage && !isAuthenticated) {
		history.replace('/')
	}
}

export const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route exact path="/" render={() => {
				 return Meteor.userId() ? <Redirect to="/dashboard" /> : <Login />
			}} />
			<Route path="/signup" render={() => {
				 return Meteor.userId() ? <Redirect to="/dashboard" /> : <Signup />
			}} />
			<Route path="/dashboard" render={() => {
				 return !Meteor.userId() ? <Redirect to="/" /> : <Dashboard />
			}} />
			<Route path="*" component={ NotFound } />
		</Switch>
	</Router>
);
