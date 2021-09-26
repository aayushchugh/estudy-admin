import React from 'react';
import { Button } from '@mui/material';

import './btn.scss';

export function BPrimary({ children, type, className }) {
	return (
		<Button
			className={`${className} btn-primary`}
			variant='container'
			type={type}
		>
			{children}
		</Button>
	);
}

export function BSecondary({ children, type, className }) {
	return (
		<Button
			variant='outlined'
			className={`${className} btn-secondary`}
			type={type}
		>
			{children}
		</Button>
	);
}
