import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Users from './components/users/Users';
import Nav from './components/layout/Nav';

function App() {
	return (
		<>
			<CssBaseline />
			<Router>
				<Nav />

				<Route path='/' exact component={Users} />
			</Router>
		</>
	);
}

export default App;
