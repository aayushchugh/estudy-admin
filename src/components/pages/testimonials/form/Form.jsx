import React, { useState } from 'react';
import axios from 'axios';

import { TextField } from '@mui/material';
import { BPrimary } from '../../../uiComponents/Btn';

import { ASuccess, AError } from '../../../uiComponents/Alert';

import './form.scss';

function Form({ setSubmit }) {
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [rating, setRating] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const submitHandler = e => {
		e.preventDefault();

		if (rating >= 0 && rating <= 5) {
			axios
				.post(
					`http://localhost:8000/v1/testimonial/add?auth=${process.env.REACT_APP_API_AUTH}`,
					{
						name: name,
						content: content,
						rating: rating,
					}
				)
				.then(data => {
					if (data.data.status === 201) {
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

					setName('');
					setContent('');
					setRating('');
					setSubmit(true);
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

				<BPrimary type='submit'>Submit</BPrimary>
			</form>
		</section>
	);
}

export default Form;
