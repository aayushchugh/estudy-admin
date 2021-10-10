import React, { useState } from 'react';
import axios from 'axios';

import { TextField } from '@mui/material';
import { BPrimary } from '../../../uiComponents/Btn';

import { ASuccess, AError } from '../../../uiComponents/Alert';

import './form.scss';

function Form({ setSubmit }) {
	const [title, setTitle] = useState('');
	const [classToAdd, setClassToAdd] = useState('');

	const submitHandler = e => {
		e.preventDefault();
		setSubmit(true);

		axios
			.post(
				`http://localhost:8000/v1/subject/add?auth=${process.env.REACT_APP_API_AUTH}`,
				{
					title: title,
					class: classToAdd,
				}
			)
			.then(data => {
				console.log(data.data);

				if (data.data.status === 201) {
					document
						.querySelector('.form__alert--success')
						.classList.remove('hidden');
				} else if (data.data.status === 400) {
					document
						.querySelector('.form__alert--exists')
						.classList.remove('hidden');
				}

				setTitle('');
				setClassToAdd('');
			});
	};

	return (
		<section className='form-section'>
			<form className='form' onSubmit={submitHandler}>
				<ASuccess className='form__alert--success hidden'>
					Successfully added new subject
				</ASuccess>

				<AError className='form__alert--exists hidden'>
					subject already exists
				</AError>

				<TextField
					label='title'
					variant='outlined'
					fullWidth
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<TextField
					label='class'
					variant='outlined'
					fullWidth
					multiline
					required
					value={classToAdd}
					onChange={e => setClassToAdd(e.target.value)}
				/>

				<BPrimary type='submit'>Add Subject</BPrimary>
			</form>
		</section>
	);
}

export default Form;
