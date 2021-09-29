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

function TestimonialsTable({ submit, setSubmit }) {
	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/v1/testimonial/get-all').then(data => {
			setApiData(data.data.data);
			setSubmit(false);
		});
		//eslint-disable-next-line
	}, [submit]);

	const handleDelete = id => {
		return e => {
			e.preventDefault();

			axios
				.delete(`http://localhost:8000/v1/testimonial/delete/${id}`)
				.then(data => {
					setSubmit(true);

					if (data.data.status === 204) {
						document
							.querySelector('.table__alert--success')
							.classList.remove('hidden');
					} else if (data.data.status === 400) {
						document
							.querySelector('.table__alert--error')
							.classList.remove('hidden');
					}
				});
		};
	};

	return (
		<section className='table-section'>
			<TableContainer className='table' component={Paper}>
				<ASuccess className='table__alert table__alert--success hidden'>
					Successfully removed testimonial
				</ASuccess>

				<AError className='table__alert table__alert--error hidden'>
					invalid id
				</AError>

				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>Content</TableCell>
							<TableCell align='right'>Rating</TableCell>
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
									{data.name}
								</TableCell>

								<TableCell align='right' className='table__content--para'>
									{data.content}
								</TableCell>

								<TableCell align='right'>{data.rating}</TableCell>

								<TableCell align='right' className='table__icon'>
									<form onSubmit={handleDelete(data._id)}>
										<BSecondary type='submit'>
											<DeleteIcon />
										</BSecondary>
									</form>
								</TableCell>

								<TableCell align='right' className='table__icon'>
									<Link to={`/testimonials/update/${data._id}`}>
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

export default TestimonialsTable;
