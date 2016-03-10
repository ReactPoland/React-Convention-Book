### Express setup with Mongoose

### Running MongoDB in the background
Once you have installed MongoDB following the instructions, then you have access to run:
```
mongod
```

which will make the database up and running for you and you want to leave it running at the background (open new tab in the terminal and leave the mongodb running in background in another one otherwise everything below won't work).

### We need to import the first example collection into the database. 

In the project's directory create a file called initData.js:
```
touch initData.js
```

And into that initiData.js file add the initial JSON with two artciles that is listed below:

In our case we are building the publishing app so it will be a list of articles. Below we will have an example collection of articles in a JSON's format:

```
[
	{
		articleId: "987654",
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	{
		articleId: "123456",
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
]
```
In general, we start from mocked collection of articles - later we will add a feature of adding more articles into the MongoDB's collection, but for now we will stick with only two artciles for the sake of brevity.




### HINT: to list your localhost databases do:
```
$ mongo
```
and while you will be in the mongo's shell, type:
```
show dbs
```
as on the full example below:
```
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2016-02-25T13:31:05.896+0100 I CONTROL  [initandlisten] 
2016-02-25T13:31:05.896+0100 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
> show dbs
local  0.078GB
>
```
... in our example it shows that we have one database in the localhost called local.

### Importing the articles to the MongoDB
Below we will use terminal (command prompt) in order to import the articles into database. Alternatively you can use Robomongo to do it via GUI as well.

```
mongoimport --db local --collection articles --jsonArray initData.js --host=127.0.0.1
```

Then you shall get in your terminal information:
```
connected to: 127.0.0.1
imported 2 documents

```

In case if you will get an error "Failed: error connecting to db server: no reachable servers" then make sure if you have running the mongod on the given host ip (127.0.0.1).

After importing those articles via the command line then you will see this reflected also in the Robomongo:

![articles import success](http://test.przeorski.pl/book/004_articles_imported_success.png)


### Server setup with NodeJS and Express.js

Once we have our articles' collection in the MongoDB, we can start working on our Express.js server in order to work on the collection.

First we need in an NPM project in our directory:
```
npm init --yes
```
The --yes flag means that we will use default settings for package.json.

Next let's create a server.js file in server directory:
```
mkdir server
cd server
touch index.js
```

Installing express and other initial dependencies:
```
npm i express@4.13.4 babel@4.7.16 babel-register@6.5.2 cors@2.7.1 body-parser@1.15.0 --save
```

@4.13.4 means that we will use this version of the Express' Framework. 

We also need libraries as following:
1) babel - [QUESTION: DO WE NEED DESCRIPTION?]
2) cors  - [QUESTION: DO WE NEED DESCRIPTION?]
3) body-parser - [QUESTION: DO WE NEED DESCRIPTION?]
4) babel-register - [QUESTION: DO WE NEED DESCRIPTION?]

After this your project's files structure shall looks like:
```
├── node_modules
│   ├── *******
├── initData.js
├── package.json
└── server
    └── index.js
```
The ******* is a wildcard which means that there are files reqired for our project, but we don't list it here as it would be too long.

### Working on our server (server.js & index.js)

In the index.js we need to add babel/register in order XYZ

The index.js file content:
```
require("babel/register");
require('./server');
```

and

The server.js file content:
```
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));

app.get('/', (req, res) => res.send('Publishing App Initial Application!'));

app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;

```

What's in the files:
Requiring the babel/register library is for being able using ES6 syntax in our code. In the index.js file, we have a "http" module which comes from NodeJS (https://nodejs.org/api/http.html#http_http). Next we have express, cors and body-parser.

Cors is a middleware for dynamically or statically enabling CORS (Cross-Origin Resource Sharing) in express applications - it will be useful in our development enviroment (we will delete it later for our production server).

Body-parser is a middleware for http's body parsing, it has some fancy settings that helps build us the app faster.


This how our app should looks on that stage of our development:
![our publishing app init screenshot](http://test.przeorski.pl/book/005_publishing_app_init2.png)


## Mongoose and express

Having the working simple express.js server, now we have to add Mongoose to our project.

```
npm i mongoose --save
```

Once we have installed mongoose and a running mongoDB database in the background, we can import it to our server.js file and do the coding:

```
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/local');

var articleSchema = {
	articleTitle:String,
	articleContent:String
}

var Article = mongoose.model('Article', articleSchema, 'articles')


var app = express();
app.server = http.createServer(app);

// CORS - 3rd party middleware
app.use(cors());

// This is required by falcor-express middleware to work correctly with falcor-browser
app.use(bodyParser.json({extended: false}));

app.use(express.static('dist'));

app.get('/', (req, res) => { 
	Article.find(function (err, articlesDocs) {

		let ourArticles = articlesDocs.map(function(articleItem){
			return `<h2>${articleItem.articleTitle}</h2> ${articleItem.articleContent}`;
		}).join("<br/>");

		res.send(`<h1>Publishing App Initial Application!</h1> ${ourArticles}`);
	});
});

app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);

export default app;

```

### A summary how to run the project
Make sure that you have mongoDB running in the background on your machine with:
```
mongod
```

then you shall see in your console something like:
```
$ mongod
2016-03-09T10:49:02.943+0100 W -        [initandlisten] Detected unclean shutdown - /data/db/mongod.lock is not empty.
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] journal dir=/data/db/journal
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover begin
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] info no lsn file in journal/ directory
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover lsn: 0
2016-03-09T10:49:02.952+0100 I JOURNAL  [initandlisten] recover /data/db/journal/j._0
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] recover cleaning up
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] removeJournalFiles
2016-03-09T10:49:02.954+0100 I JOURNAL  [initandlisten] recover done
2016-03-09T10:49:02.966+0100 I JOURNAL  [durability] Durability thread started
2016-03-09T10:49:02.966+0100 I CONTROL  [initandlisten] MongoDB starting : pid=2322 port=27017 dbpath=/data/db 64-bit host=Kamils-MBP
2016-03-09T10:49:02.967+0100 I JOURNAL  [journal writer] Journal writer thread started
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] 
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] db version v3.0.6
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] git version: nogitversion
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] build info: Darwin Kamils-MacBook-Pro.local 14.5.0 Darwin Kernel Version 14.5.0: Wed Jul 29 02:26:53 PDT 2015; root:xnu-2782.40.9~1/RELEASE_X86_64 x86_64 BOOST_LIB_VERSION=1_49
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] allocator: system
2016-03-09T10:49:02.967+0100 I CONTROL  [initandlisten] options: {}
2016-03-09T10:49:03.087+0100 I NETWORK  [initandlisten] waiting for connections on port 27017
2016-03-09T10:49:08.501+0100 I NETWORK  [initandlisten] connection accepted from 127.0.0.1:50490 #1 (1 connection now open)
```

and then in the main directory run node with:
```
node server/index.js 
```
and your terminal shall show something like:
```
$ node server/index.js 
Started on port 3000
```

![articles import success](http://test.przeorski.pl/book/006_fetching_articles_from_mongoose.png)



