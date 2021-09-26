import React, { useState } from 'react';
import TestimonialsTable from '../pages/testimonials/table/Table';
import UpdateForm from '../pages/testimonials/updateForm/UpdateForm';

function UpdateTestimonial() {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<UpdateForm submit={submit} setSubmit={setSubmit} />
			<TestimonialsTable submit={submit} setSubmit={setSubmit} />
		</main>
	);
}

export default UpdateTestimonial;
