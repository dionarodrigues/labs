import express from 'express';
import cors from 'cors';

import airlinesData from './data.json' with {type: 'json'};

const app = express();
const port = 5002;

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

app.get('/airlines/europe', (req, res) => {
	res.json(airlinesData['europe']);
});

app.get('/airlines/america', (req, res) => {
	res.json(airlinesData['america']);
});

app.get('/airlines/asia', (req, res) => {
	res.json(airlinesData['asia']);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
