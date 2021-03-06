import React, { useState } from 'react';

import Table from '../pages/allClass/table/Table';
import UpdateForm from '../pages/allClass/updateForm/UpdateForm';

function UpdateClass() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<UpdateForm setSubmit={setSubmit} />
			<Table submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default UpdateClass;
