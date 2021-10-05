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
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { BSecondary } from '../../uiComponents/Btn';
import { ASuccess, AError } from '../../uiComponents/Alert';

function Users({ submit, setSubmit }) {
	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/users/all-users?auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setApiData(data.data.data);
				setSubmit(false);
			});
		//eslint-disable-next-line
	}, [submit]);

	const handleForm = id => {
		return e => {
			e.preventDefault();

			axios
				.delete(
					`http://localhost:8000/v1/users/delete-user/${id}?auth=${process.env.REACT_APP_API_AUTH}`
				)
				.then(data => {
					setSubmit(true);

					if (data.data.status === 200) {
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

	// WARNING: Css for this table is coming from table.scss from testimonials

	return (
		<>
			<TableContainer className='table' component={Paper}>
				<ASuccess className='table__alert table__alert--success hidden'>
					Successfully deleted user
				</ASuccess>
				<AError className='table__alert table__alert--error hidden'>
					invalid id
				</AError>

				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>Email</TableCell>
							<TableCell align='right'>class</TableCell>
							<TableCell align='right'>Id</TableCell>
							<TableCell align='right'>delete</TableCell>
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
								<TableCell align='right'>{data.class}</TableCell>
								<TableCell align='right'>{data._id}</TableCell>
								<TableCell align='right'>
									<form onSubmit={handleForm(data._id)}>
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
		</>
	);
}

export default Users;
