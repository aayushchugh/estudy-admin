import React, { useEffect, useState } from 'react';
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

import { BSecondary } from '../../../uiComponents/Btn';
import { AError, ASuccess } from '../../../uiComponents/Alert';
import './table.scss';

function SubjectTable({ submit, setSubmit }) {
	const [apiData, setApiData] = useState([]);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/subject/get-all?all=true&auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setApiData(data.data.data);
				setSubmit(false);
			});
		//eslint-disable-next-line
	}, [submit]);

	const handleDelete = id => {
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
							.querySelector('.subject-table__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						setError(data.data.message);
						document
							.querySelector('.subject-table__alert--error')
							.classList.remove('hidden');
					}
				});
		};
	};

	return (
		<section className='subject-section'>
			<TableContainer className='subject-table' component={Paper}>
				<ASuccess className='subject-table__alert subject-table__alert--success hidden'>
					{success}
				</ASuccess>

				<AError className='subject-table__alert subject-table__alert--error hidden'>
					{error}
				</AError>

				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='right'>Class</TableCell>
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
									<Link
										to={`/subject/${data._id}`}
										className='subject-table__link'
									>
										{data.title}
									</Link>
								</TableCell>

								<TableCell
									align='right'
									className='subject-table__content--para'
								>
									{data.classTitle}
								</TableCell>

								<TableCell align='right' className='subject-table__icon'>
									<form onSubmit={handleDelete(data._id)}>
										<BSecondary type='submit'>
											<DeleteIcon />
										</BSecondary>
									</form>
								</TableCell>

								<TableCell align='right' className='subject-table__icon'>
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
		</section>
	);
}

export default SubjectTable;
