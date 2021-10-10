import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { BSecondary } from '../../uiComponents/Btn';
import { AError, ASuccess } from '../../uiComponents/Alert';
import './contacts.scss';

function Contacts() {
	const [apiData, setApiData] = useState([]);
	const [submit, setSubmit] = useState(false);
	const [status, setStatus] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/contact-us/get-all?auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setApiData(data.data.data);
				setSubmit(false);
			});
		//eslint-disable-next-line
	}, [submit]);

	const updateHandler = id => {
		return e => {
			e.preventDefault();

			axios
				.patch(
					`http://localhost:8000/v1/contact-us/update/${id}?auth=${process.env.REACT_APP_API_AUTH}`,
					{
						id: e.target.id.value,
						status: status,
					}
				)
				.then(data => {
					setSubmit(true);

					if (data.data.status === 200) {
						setSuccess(data.data.message);
						document
							.querySelector('.contacts__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						setError(data.data.message);

						document
							.querySelector('.contacts__alert--error')
							.classList.remove('hidden');
					}
				});
		};
	};

	const deleteHandler = id => {
		return e => {
			e.preventDefault();

			axios
				.delete(
					`http://localhost:8000/v1/contact-us/delete/${id}?auth=${process.env.REACT_APP_API_AUTH}`
				)
				.then(data => {
					setSubmit(true);
					console.log(data.data);
					console.log(e.target.id.value);

					if (data.data.status === 200) {
						setSuccess(data.data.message);
						document
							.querySelector('.contacts__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						setError(data.data.message);
						document
							.querySelector('.contacts__alert--error')
							.classList.remove('hidden');
					}
				});
		};
	};

	return (
		<section className='contacts-section'>
			<TableContainer className='contacts' component={Paper}>
				<ASuccess className='contacts__alert contacts__alert--success hidden'>
					{success}
				</ASuccess>

				<AError className='contacts__alert contacts__alert--error hidden'>
					{error}
				</AError>

				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>email</TableCell>
							<TableCell align='right'>subject</TableCell>
							<TableCell align='right'>message</TableCell>
							<TableCell align='right'>status</TableCell>
							<TableCell align='right'>update status</TableCell>
							<TableCell align='right'>update contact</TableCell>
							<TableCell align='right'>delete contact</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{apiData.map(data => (
							<TableRow
								key={data._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{data.name}
								</TableCell>

								<TableCell align='right'>{data.email}</TableCell>

								<TableCell align='right'>{data.subject}</TableCell>

								<TableCell align='right' className='contacts__content--para'>
									{data.message}
								</TableCell>

								<TableCell align='right' className='contacts__content--para'>
									{data.status}
								</TableCell>

								<TableCell align='right'>
									<FormControl fullWidth>
										<InputLabel>update Status</InputLabel>

										<Select
											label='update status'
											value={status}
											onChange={e => setStatus(e.target.value)}
										>
											<MenuItem value='waiting-response'>
												waiting response
											</MenuItem>

											<MenuItem value='opened'>opened</MenuItem>

											<MenuItem value='closed'>closed</MenuItem>
										</Select>
									</FormControl>
								</TableCell>

								<TableCell align='right' className='table__icon'>
									<form onSubmit={updateHandler(data._id)}>
										<BSecondary type='submit'>
											<CheckIcon />
										</BSecondary>
									</form>
								</TableCell>

								<TableCell align='right' className='table__icon'>
									<form onSubmit={deleteHandler(data._id)}>
										<BSecondary type='submit'>
											<DeleteIcon />
										</BSecondary>
									</form>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}

export default Contacts;
