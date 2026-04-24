import dotenv from 'dotenv';
dotenv.config();

const api = process.env.X_RAPID_API_KEY;
const host = process.env.X_RAPID_API_HOST;

const url = 'https://project-gutenberg-free-books-api1.p.rapidapi.com/subjects';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': api,
		'x-rapidapi-host': host,
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}