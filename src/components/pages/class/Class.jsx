import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { BSecondary } from '../../uiComponents/Btn';
import { ASuccess, AError } from '../../uiComponents/Alert';

import './class.scss';

function Class({ submit, setSubmit }) {
	const [apiData, setApiData] = useState([]);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/class/get-single/${id}?subjects=true&auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setApiData(data.data.data.subjects);
				setSubmit(false);
			});
		//eslint-disable-next-line
	}, [submit]);

	const handleForm = id => {
		return e => {
			e.preventDefault();

			axios
				.delete(
					`http://localhost:8000/v1/subject/delete/${id}?auth=${process.env.REACT_APP_API_AUTH}`
				)
				.then(data => {
					setSubmit(true);

					if (data.data.status === 200) {
						setSuccess(data.data.message);
						document
							.querySelector('.class__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						setError(data.data.message);
						document
							.querySelector('.class__alert--error')
							.classList.remove('hidden');
					}
				});
		};
	};

	return (
		<>
			<TableContainer className='class' component={Paper}>
				<ASuccess className='class__alert class__alert--success hidden'>
					{success}
				</ASuccess>

				<AError className='class__alert class__alert--error hidden'>
					{error}
				</AError>

				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='right'>delete</TableCell>
							<TableCell align='right'>update</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{apiData.map(data => (
							<TableRow
								key={data._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									<Link to={`/subject/${data._id}`} className='class__link'>
										{data.title}
									</Link>
								</TableCell>
								<TableCell align='right'>
									<form onSubmit={handleForm(data._id)}>
										<BSecondary type='submit'>
											<DeleteIcon />
										</BSecondary>
									</form>
								</TableCell>

								<TableCell align='right'>
									<Link to={`/subject/update/${data._id}`}>
										<BSecondary>
											<CreateIcon />
										</BSecondary>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default Class;
