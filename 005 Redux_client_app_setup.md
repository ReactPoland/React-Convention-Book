Preparation:
1) make iron project copy
2) make from it a publishing app (simple)
3) Delete from backwards 
4) based on the deleted commits history from our preparation publishing app start describing steps of making it

REDUX - steps:
1) First Action (fetchArticles)
2) Store/Reducers - mock data from initData.js (MOCKED MODEL)
3) React View
4) Adding action trigger to the view


## Redux basics concepts

### The Single Immutable State Tree
The most important principle of Redux is that you are going to represent whole 
state of your application as a single javascript object. 

All changes (actions) in Redux are explicit so you can track a history of all your actions throught the appication with a dev tool.

![redux dev tool](http://test.przeorski.pl/book/007_example_redux_state_changes.png)

Above is a simple example dev tool use case which you will use in your development enviroment. It will help you to track the changes of state in your app. The example shows how we have incremented the counter value in our state by +1 three times. Of course our publishing app structure will be much more complcated than this example above. You will learn more about that dev tool later in the book.


### Immutability - actions & state tree is read only
You cannot modify/mutate the values in your state tree the same was as it was in Facebook's FLUX (and other) implementations. 

An action the same way as in other FLUX implementations is a plain object that describes the change - like adding an article (below we mock the payload for the sake of brevity):

```
{
	type: "ADD_ARTICLE",
	payload: "_____HERE_GOES_INFORMATION_ABOUT_THE_CHANGE_____"
}
```
An action is a minimal representation of the change for our app state tree. 

Let's prepare actions for our publishing app.


### Pure and impure functions
Pure function is a function that doesn't have any side effects like for example
I/O (reading a file or a HTTP request). Unpure functions have that side effects so for example if you make a call to the HTTP request it can return different values for exactly the same arguments Y,Z (`function(X,Y)`) because of an endpoints is returning us random value or can be down because of an server error etc. 

Pure functions are always predictable for the same X,Y arguments. In the Redux we use only PURE FUNCTIONS in Reducers and Actions (otherwise Redux's lib won't work properly).

In that book you will learn whole sturcture where to make API calls so if you will follow the book, then you don't have worry too much of that principle in Redux.

### The Reducer function
Reducer from Redux can be compared to Single Store from Facebook's FLUX. Important is that a Reducer always take a previous state and returns a new reference to new object (with use of Object.assign and other like that) so we can have immutable JS that helps us build more predictable state of our application in comparision to older's FLUX implementations.

This creating a new references is optimized because redux does use old references to values from reducers that didn't change. That causes that even if each action is creating a whole new object via reducer, then non-changes values has a previous reference in the memory so we don't overuse the computation power of the machine. Everything is fast.

In our app we will have article reducer which will help us to list, add, edit and delete our articles from the view layer.


### Big picture of our client-side files structure
This is how us going to be our client-side application sturcutre for giving you big picture of what we are going to work on:

TODO



First let's create a reducer for our publication app:

```
mkdir src
cd src
mkdir reducers
cd reducers
touch article.js
```

So our first reducer's location is: 
```src/reducers/article.js```

and the content of our reducers/article.js:
```
const articleMock = {
	"987654": {
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	"123456": {
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
};

cost articles = (state = 0, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
			return new Object.assign({}, articleMock);
		default:
			return new Object.assign({}, {error: "action type hasn't been provided"});
	}
}
```
On the above code we have our artickeMock keept in the browser memory the same as in initData.js for the time beeing - later we will fetch this data from our backend's database. 

The arrow function ***cost articles*** is getting action.type which will come from CONSTANTS (we will create them later) the same way as in Facebook's FLUX implementation. 



Let's create a src/index.html file:

```
pwd
/Users/przeor/Desktop/React-Convention-Book/src/reducers
cd ..
touch index.html
```

and the src/index.html content is:
```
<!doctype html>
<html lang="en">
<head>
  <title>Mastering React full-stack development</title>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.3.1/redux.js"></script>
</head>
<body>
  <div id="publishingAppRoot"></div>
</body>
</html>
```
For the beginning we will use redux from it's CDN - later we will import it to the project from NPM.

Now we can import ***createStore*** from 














```
pwd
/Users/przeor/Desktop/React-Convention-Book/src/reducers
cd ..
mkdir constants
cd constants
touch article.js
```








