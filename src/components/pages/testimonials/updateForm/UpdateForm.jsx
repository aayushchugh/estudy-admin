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
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

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
	}, [id]);

	const submitHandler = e => {
		e.preventDefault();

		if (rating >= 0 && rating <= 5) {
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

					if (data.data.status === 200) {
						setSuccess(data.data.message);
						document
							.querySelector('.form__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						setError(data.data.message);
						document
							.querySelector('.form__alert--error')
							.classList.remove('hidden');
					}
				});
		} else {
			setError('Rating must be between 0 and 5');
			document.querySelector('.form__alert--error').classList.remove('hidden');
		}
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='form__alert--success hidden'>{success}</ASuccess>

				<AError className='form__alert--error hidden'>{error}</AError>

				<TextField
					onChange={e => setName(e.target.value)}
					value={name}
					label='name'
					variant='outlined'
					fullWidth
					required
				/>

				<TextField
					onChange={e => setContent(e.target.value)}
					value={content}
					label='content'
					variant='outlined'
					fullWidth
					required
				/>

				<TextField
					onChange={e => setRating(e.target.value)}
					value={rating}
					label='rating'
					variant='outlined'
					fullWidth
					required
				/>

				<BPrimary type='submit'>Update</BPrimary>
			</form>
		</section>
	);
}

export default UpdateForm;
