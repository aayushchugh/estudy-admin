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
					document.querySelectorAll('input').forEach(el => {
						el.value = '';
					});
					setSubmit(true);

					if (data.data.status === 201) {
						document
							.querySelector('.form__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 500) {
						document
							.querySelector('.form__alert--went-wrong')
							.classList.remove('hidden');
					}
				});
		} else {
			document
				.querySelector('.form__alert--rating-between-0-5')
				.classList.remove('hidden');
		}
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='form__alert--success hidden'>
					Successfully added new testimonial
				</ASuccess>

				<AError className='form__alert--went-wrong hidden'>
					something went wrong
				</AError>

				<AError className='form__alert--rating-between-0-5 hidden'>
					Rating must be between 0 and 5
				</AError>

				<TextField
					onChange={e => setName(e.target.value)}
					label='name'
					variant='outlined'
					fullWidth
				/>

				<TextField
					onChange={e => setContent(e.target.value)}
					label='content'
					variant='outlined'
					fullWidth
				/>

				<TextField
					onChange={e => setRating(e.target.value)}
					label='rating'
					variant='outlined'
					fullWidth
				/>

				<BPrimary type='submit'>Submit</BPrimary>
			</form>
		</section>
	);
}

export default Form;
