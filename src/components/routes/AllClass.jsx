import React, { useState } from 'react';
import Form from '../pages/allClass/form/Form';
import Table from '../pages/allClass/table/Table';

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
