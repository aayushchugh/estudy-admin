import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { TextField } from '@mui/material';
import { BPrimary } from '../../../uiComponents/Btn';

import { ASuccess, AError } from '../../../uiComponents/Alert';

function UpdateForm({ setSubmit }) {
	const { id } = useParams();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/class/get-single/${id}?auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setTitle(data.data.data.title);
				setDescription(data.data.data.description);
			});
		// eslint-disable-next-line
	}, [id]);

	const submitHandler = e => {
		e.preventDefault();

		axios
			.patch(
				`http://localhost:8000/v1/class/update/${id}?auth=${process.env.REACT_APP_API_AUTH}`,
				{
					title,
					description,
				}
			)
			.then(data => {
				setSubmit(true);
				if (data.data.status === 200) {
					setSuccess(data.data.message);
					document.querySelector('.success-alert').classList.remove('hidden');
				} else if (data.data.status === 400) {
					setError(data.data.message);
					document.querySelector('.error-alert').classList.remove('hidden');
				}
			});
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='success-alert hidden'>{success}</ASuccess>

				<AError className='error-alert hidden'>{error}</AError>

				<TextField
					onChange={e => setTitle(e.target.value)}
					value={title}
					label='name'
					variant='outlined'
					required
					fullWidth
				/>

				<TextField
					onChange={e => setDescription(e.target.value)}
					value={description}
					label='content'
					variant='outlined'
					required
					fullWidth
				/>

				<BPrimary type='submit'>Update</BPrimary>
			</form>
		</section>
	);
}

export default UpdateForm;
