import React, { useState } from 'react';

import Form from '../pages/allSubjects/form/From';
import SubjectTable from '../pages/allSubjects/table/Table';

function AllSubject() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<Form setSubmit={setSubmit} />
			<SubjectTable submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default AllSubject;
