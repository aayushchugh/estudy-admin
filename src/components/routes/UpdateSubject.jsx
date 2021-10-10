import React, { useState } from 'react';
import UpdateForm from '../pages/allSubjects/updateForm/UpdateForm';
import SubjectTable from '../pages/allSubjects/table/Table';

function UpdateSubject() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<UpdateForm submit={submit} setSubmit={setSubmit} />
			<SubjectTable submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default UpdateSubject;
