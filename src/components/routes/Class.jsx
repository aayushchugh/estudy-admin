import React, { useState } from 'react';

import { default as Table } from '../pages/class/Class';

function Class() {
	const [formSubmit, setFormSubmit] = useState(false);

	return (
		<main>
			<Table setSubmit={setFormSubmit} submit={formSubmit} />
		</main>
	);
}

export default Class;
