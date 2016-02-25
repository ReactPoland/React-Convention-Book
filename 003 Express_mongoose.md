# Express setup with Mongoose

Once you have installed MongoDB following the instructions, then you have access to run:
```
mongod
```

which will make the database up and running for you and you want to leave it running at the background.

we need to import the first example collection into the database. 

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






