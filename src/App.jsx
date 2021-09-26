import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/Nav';
import User from './components/routes/User';
import Testimonials from './components/routes/Testimonials';
import UpdateTestimonial from './components/routes/UpdateTestimonial';

function App() {
	return (
		<>
			<CssBaseline />
			<Router>
				<Nav />

				<Route path='/' exact>
					<User />
				</Route>

				<Route path='/testimonials' exact>
					<Testimonials />
				</Route>

				<Route path='/testimonials/update/:id' exact>
					<UpdateTestimonial />
				</Route>
			</Router>
		</>
	);
}

export default App;
