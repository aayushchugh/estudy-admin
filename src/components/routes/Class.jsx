import React, { useState } from 'react';
import Form from '../pages/class/form/Form';
import Table from '../pages/class/table/Table';

function Class() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<Form setSubmit={setSubmit} />
			<Table submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default Class;
