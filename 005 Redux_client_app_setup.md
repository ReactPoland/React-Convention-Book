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
TODO 

### The Reducer function
TODO 



### Big picture of our client-side files structure
This is how us going to be our client-side application sturcutre for giving you big picture of what we are going to discuss:

```
├── actions
│   └── article.js
├── app.js
├── components
│   └── dumbArticleComponent.js
├── constants
│   └── article.js
├── containers
│   ├── DevTools.js
│   ├── DevToolsWindow.js
│   └── Root.js
├── decorators
│   └── Loader.js
├── falcorModel.js
├── index.html
├── layouts
│   └── CoreLayout.js
├── models
│   └── article.js
├── reducers
│   ├── article.js
│   └── index.js
├── routes
│   └── index.js
├── store
│   └── configureStore.js
├── styles
│   ├── _base.scss
│   ├── components
│   │   ├── _add-section.scss
│   │   ├── _excerpt.scss
│   │   ├── _header.scss
│   │   ├── _menu-list.scss
│   │   └── _sidenav.scss
│   ├── core.scss
│   ├── inlineStyles.js
│   └── vendor
│       └── _normalize.scss
├── utils
│   ├── API.js
│   ├── falcorUtils.js
│   ├── index.js
│   ├── mapHelpers.js
│   └── roles.js
└── views
    └── HomeView.js
```





