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

function Users() {
	const [apiData, setApiData] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:8000/v1/users/all-users').then(data => {
			setApiData(data.data.data);
		});
	}, []);

	return (
		<main>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>Email</TableCell>
							<TableCell align='right'>Id</TableCell>
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
								<TableCell align='right'>{data._id}</TableCell>
								<TableCell align='right'>
									<DeleteIcon />
								</TableCell>
							</TableRow>
						))}

						{/* {rows.map(row => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.calories}</TableCell>
								<TableCell align='right'>{row.fat}</TableCell>
							</TableRow>
						))} */}
					</TableBody>
				</Table>
			</TableContainer>
		</main>
	);
}

export default Users;
