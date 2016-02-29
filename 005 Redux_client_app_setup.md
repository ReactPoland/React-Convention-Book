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





