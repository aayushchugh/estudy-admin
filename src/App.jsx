import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Users from './components/users/Users';
import Nav from './components/layout/Nav';

function App() {
	const [formSubmit, setFormSubmit] = useState(false);

	return (
		<>
			<CssBaseline />
			<Router>
				<Nav />

				<Route path='/' exact>
					<Users setSubmit={setFormSubmit} submit={formSubmit} />
				</Route>
			</Router>
		</>
	);
}

export default App;
