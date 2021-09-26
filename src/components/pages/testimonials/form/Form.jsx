import React, { useState } from 'react';
import axios from 'axios';

import { TextField } from '@mui/material';
import { BPrimary } from '../../../uiComponents/Btn';

import './form.scss';

function Form() {
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
			.then(() => {
				document.querySelectorAll('input').forEach(el => {
					el.value = '';
				});
			});
	};

	return (
		<section>
			<form onSubmit={submitHandler}>
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
