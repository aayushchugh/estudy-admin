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

import './updateEmailList.scss';

function UpdateEmailList() {
	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/v1/updateEmailList/get-all?auth=${process.env.REACT_APP_API_AUTH}`
			)
			.then(data => {
				setApiData(data.data.data);
			});
	}, []);

	return (
		<section className='update-email-list-section'>
			<TableContainer className='update-email-list' component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>Email</TableCell>
							<TableCell align='right'>Class</TableCell>
							<TableCell align='right'>Mail Chimp id</TableCell>
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

								<TableCell align='right'>{data.mailchimp_id}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}

export default UpdateEmailList;
