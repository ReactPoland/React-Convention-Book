import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({
	extended: false
}));

app.get('/', (req, res) => res.send('Publishing App Initial Application!'));

app.server.listen(process.env.PORT || 8080);
console.log(`Started on port ${app.server.address().port}`);

export default app;
