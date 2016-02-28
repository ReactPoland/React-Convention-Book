import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());

app.use(bodyParser.json({
	limit : '100kb'
}));


app.server.listen(process.env.PORT || 8080);
console.log(`Started on port ${app.server.address().port}`);


export default app;
