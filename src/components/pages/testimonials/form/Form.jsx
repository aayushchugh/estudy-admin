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

		axios
			.post('http://localhost:8000/v1/testimonial/add', {
				name: name,
				content: content,
				rating: rating,
			})
			.then(data => {
				document.querySelectorAll('input').forEach(el => {
					el.value = '';
				});
				setSubmit(true);

				if (data.data.status === 201) {
					document.querySelector('.success-alert').classList.remove('hidden');
				} else if (data.data.status === 500) {
					document.querySelector('.error-alert').classList.remove('hidden');
				}
			});
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='success-alert hidden'>
					Successfully added new testimonial
				</ASuccess>

				<AError className='error-alert hidden'>something went wrong</AError>

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
