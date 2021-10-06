import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { TextField } from '@mui/material';
import { BPrimary } from '../../../uiComponents/Btn';

import { ASuccess, AError } from '../../../uiComponents/Alert';

function UpdateForm({ submit, setSubmit }) {
	const { id } = useParams();

	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [rating, setRating] = useState('');

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/testimonial/get-single/${id}?auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setName(data.data.data.name);
				setContent(data.data.data.content);
				setRating(data.data.data.rating);
			});
		// eslint-disable-next-line
	}, [submit]);

	const submitHandler = e => {
		e.preventDefault();

		axios
			.patch(
				`http://localhost:8000/v1/testimonial/update/${id}?auth=${process.env.REACT_APP_API_AUTH}`,
				{
					name: name,
					content: content,
					rating: rating,
				}
			)
			.then(data => {
				console.log(data);
				setSubmit(true);

				if (data.data.status === 201) {
					document.querySelector('.success-alert').classList.remove('hidden');
				} else if (data.data.status === 400) {
					document.querySelector('.error-alert').classList.remove('hidden');
				}
			});
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='success-alert hidden'>
					Successfully updated testimonial
				</ASuccess>

				<AError className='error-alert hidden'>invalid id</AError>

				<TextField
					onChange={e => setName(e.target.value)}
					value={name}
					label='name'
					variant='outlined'
					fullWidth
				/>

				<TextField
					onChange={e => setContent(e.target.value)}
					value={content}
					label='content'
					variant='outlined'
					fullWidth
				/>

				<TextField
					onChange={e => setRating(e.target.value)}
					value={rating}
					label='rating'
					variant='outlined'
					fullWidth
				/>

				<BPrimary type='submit'>Update</BPrimary>
			</form>
		</section>
	);
}

export default UpdateForm;
