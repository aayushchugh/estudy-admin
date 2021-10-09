import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/Nav';
import User from './components/routes/User';
import Testimonials from './components/routes/Testimonials';
import UpdateTestimonial from './components/routes/UpdateTestimonial';
import UpdateEmailList from './components/routes/UpdateEmailList';
import Contacts from './components/routes/Contacts';
import AllClass from './components/routes/AllClass';
import UpdateClass from './components/routes/UpdateClass';
import Class from './components/routes/Class';

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

				<Route path='/update-email-list' exact>
					<UpdateEmailList />
				</Route>

				<Route path='/contacts' exact>
					<Contacts />
				</Route>

				<Route path='/class' exact>
					<AllClass />
				</Route>

				<Route path='/class/update/:id' exact>
					<UpdateClass />
				</Route>

				<Route path='/class/:id' exact>
					<Class />
				</Route>
			</Router>
		</>
	);
}

export default App;
