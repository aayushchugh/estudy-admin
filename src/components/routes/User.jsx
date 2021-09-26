import React, { useState } from 'react';
import Users from '../pages/users/Users';

function User() {
	const [formSubmit, setFormSubmit] = useState(false);

	return (
		<main>
			<Users setSubmit={setFormSubmit} submit={formSubmit} />
		</main>
	);
}

export default User;
