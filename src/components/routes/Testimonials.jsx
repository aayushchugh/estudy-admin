import React, { useState } from 'react';
import Form from '../pages/testimonials/form/Form';
import TestimonialsTable from '../pages/testimonials/table/Table';
import UpdateForm from '../pages/testimonials/updateForm/UpdateForm';

function Testimonials() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<Form submit={submit} setSubmit={setSubmit} />
			<TestimonialsTable submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default Testimonials;
