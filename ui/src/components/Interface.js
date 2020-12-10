import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import api from '../api/api';

const Interface = () => {

	const [url, setUrl] = useState('');
	const [shortened, setShortened] = useState('');

	const handleSubmit = async () => {

		if (!url) return;

		api.createUrl(url)
		.then((data) => {

			const shortenedPath = window.location.href + data.shortenedPath;

			setShortened(shortenedPath);
			setUrl('');
		})
		.catch((err) => {
			console.log('error: something went wrong', err);
		});
	}

	return (
		<div>
			<form>
				<TextField
				placeholder='Enter full URL here'
				onChange={(e) => setUrl(e.target.value)}
				value={url}
				/>
				<br />
				<br />
				<Button
				variant="contained"
				disabled={!url}
				color='primary'
				onClick={handleSubmit}
				>Get my shortened URL!</Button>
			</form>
			 {shortened && <p>Your shortened URL is <a href={shortened}>{shortened}</a></p>}
		</div>
	)
}

export default Interface;
