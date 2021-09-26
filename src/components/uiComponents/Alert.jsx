import React from 'react';
import { Alert } from '@mui/material';

export function AError({ className, children }) {
	const closeHandler = e => {
		const alert = e.target.parentElement.parentElement.parentElement;

		if (alert.tagName === 'DIV') {
			alert.classList.add('hidden');
		}
	};

	return (
		<Alert className={`${className}`} onClose={closeHandler} severity='error'>
			{children}
		</Alert>
	);
}

export function ASuccess({ className, children }) {
	const closeHandler = e => {
		const alert = e.target.parentElement.parentElement.parentElement;

		if (alert.tagName === 'DIV') {
			alert.classList.add('hidden');
		}
	};

	return (
		<Alert className={`${className}`} onClose={closeHandler} severity='success'>
			{children}
		</Alert>
	);
}
