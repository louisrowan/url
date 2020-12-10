import axios from 'axios';

const api = {};

api.createUrl = (url) => {

	return axios({
		method: 'post',
		url: '/urls',
		data: { url }
	})
	.then((res) => {
		return res.data;
	});
};

api.getFullUrl = (shortenedPath) => {

	return axios({
		method: 'get',
		url: `/urls/${shortenedPath}`
	})
	.then((res) => {
		return res.data.fullPath;
	});
}

export default api;