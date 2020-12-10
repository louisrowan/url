import { useEffect } from 'react';
import { Container } from '@material-ui/core';

import api from '../api/api';
import Interface from './Interface';

import '../App.css';

function App() {

	useEffect(() => {

		const pathname = window.location.pathname.substring(1); // remove the slash from first char

		if (pathname) {
			api.getFullUrl(pathname)
			.then((fullPath) => {
				window.location.href = fullPath;
			})
			.catch((err) => {
				console.log('error finding url in database', err);
			});
		}
	}, []);

  	return (
	    <div className="App">
		      <Container>
		      		<h1>URL shortener</h1>
		      		<Interface />
		      </Container>
	    </div>
  	);
}

export default App;
