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

	useEffect(() => {
		axios.get('http://localhost:8000/v1/contact-us/get-all').then(data => {
			setApiData(data.data.data);
			setSubmit(false);
		});
		//eslint-disable-next-line
	}, [submit]);

	const updateHandler = e => {
		e.preventDefault();

		axios
			.patch('http://localhost:8000/v1/contact-us/update', {
				id: e.target.id.value,
				status: status,
			})
			.then(data => {
				setSubmit(true);

				if (data.data.status === 204) {
					document
						.querySelector('.contacts__alert--success-update')
						.classList.remove('hidden');
				} else if (data.data.status === 400) {
					document
						.querySelector('.contacts__alert--error-update')
						.classList.remove('hidden');
				}
			});
	};

	const deleteHandler = id => {
		return e => {
			e.preventDefault();

			axios
				.delete(`http://localhost:8000/v1/contact-us/delete/${id}`)
				.then(data => {
					setSubmit(true);
					console.log(data.data);
					console.log(e.target.id.value);

					if (data.data.status === 204) {
						document
							.querySelector('.contacts__alert--success-delete')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						document
							.querySelector('.contacts__alert--error-delete')
							.classList.remove('hidden');
					}
				});
		};
	};

	return (
		<section className='contacts-section'>
			<TableContainer className='contacts' component={Paper}>
				<ASuccess className='contacts__alert contacts__alert--success-update hidden'>
					Successfully updated contact
				</ASuccess>

				<ASuccess className='contacts__alert contacts__alert--success-delete hidden'>
					Successfully deleted contact
				</ASuccess>

				<AError className='contacts__alert contacts__alert--error-update hidden'>
					invalid id or status
				</AError>

				<AError className='contacts__alert contacts__alert--error-delete hidden'>
					invalid id contact not found
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
									<form onSubmit={updateHandler}>
										<input type='hidden' name='id' value={data._id} />

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
