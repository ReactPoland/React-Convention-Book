http://www.valvesoftware.com/company/Valve_Handbook_LowRes.pdf

#### ReactConvention - handbook for React Developers


**** 
"So many books, so little time." ― Frank Zappa

"So many projects, so little time." - Kamil Przeorski
**** 


## Preface
------

In 2013 React was almost "nothing", today it's "something" for the JavaScript world. We developers, have so little time and so much work to do. The main problem with anyone who wants to learn how to make single-page-apps with React is that there __are no really conventions that one can follow__. We are running a React Webshop from mid 2014 and __we faced so many frustrations__. Mostly when a client who had already an MVP wanted us to expand based on his codebase. __No convention at all, many projects structure codebases and almost each one had it's weak points - this led us to many frustrations__. Another source of annoyance is also when you need to introduce a new developer to your "well known to you" codebase __and you want to make sure that he doesn't make any "newbie" mistakes__. In context of this preface a "newbie" means a someone who isn't familiarized to the project's structure. Because he is not familizarized with the project's configuration, then he is not really productive in his first month of work and additionally slows your progress down. __You need to learn him about your configuration so it takes decent amount time to pass all your knowledge to your new teammate in the project__. The React Convention handbook helps you to save time on transfering knowledge about your project's structure to any new member. 

The main ReactC's goal is to create "ready to go" convention that you can share with your colleagues. 

__SHARE THE REACT CONVETION IF YOU LIKE THE IDEA__

We will familiarize your new teammate to your React's project sturcture so you will save a lot of money when following it. You will save 90% of your time on explaining why, how and what has been done with the project's codebase. 

__The handbook is also a good for people who want to start a new project from scratch__.

__PLEASE USE FEEDBACK FEATURE, SO WE CAN IMPROVE THAT HANDBOOK BASED ON YOUR FINDINGS (https://github.com/przeor/selection-sharer)__



## How to use this handbook
------

The only requirement to get all that benefits mentioned in the preface is that you need to start your project with that react-redux-starter-kit:
```
https://github.com/davezuko/react-redux-starter-kit
```

We have found this starter, best (we know what we are talking about because we made over 15+ different React projects so far). Even Dan Abramov has noticed that this starter kit is really awesome one:

![Dan Abramov](http://test.przeorski.pl/book/901_dan_abramov.png)

After you are using this starter kit, then the handbook will provide you the value which will save your team a plenty of time at work.



------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

Welcome to React Convention was of doing apps

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------

------- SEPARATE PAGE WITH AN IMAGE -------



## Your First Step
------

In a default starter kit from the @davezuko, you can find a home page and a counter component which looks as following:

![starter counter](http://test.przeorski.pl/book/902_starter_counter3.png)

This is a simple application with a counter, and throught this handbook you will implement other views and components which will help you understand whole codebase from a big picture perspective.

To explain the whole code structure, we will start with developing a new route called Dashboard with some basic features. When you will be done with it, then you will implement a registration and login which will make you sure that you know how to do it 100% just on your own.


First step is to clone the starter kit and start working on this commit (the handbook was written on that commit, so for better experience you shall work on the same one):
```
9a03e99c0dd2e7102d43264cc495bbdd4e10dcdd
```

... so you you will be truly working on that starting codebase:
```
https://github.com/davezuko/react-redux-starter-kit/tree/9a03e99c0dd2e7102d43264cc495bbdd4e10dcdd
```

After you have cloned the repo and you are at the same commit as me, then we can continue with the fun.


## General client codebase structure
------

We will focus on the client-side explanation for now, so let's discuss the "src" directory that has following structure:
```
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

If you were working on any FLUX or redux projects, then the project structure shall be quite familiar to you. You will learn all the things located in that project step-by-step (bottom-up approach).

Don't worry if you don't get the structure so far, you will ramp up with knowledge about it during following the instructions. We will also explain each step so you will learn by doing.

Let's start with implementing a new route called "DASHBOARD".


## New dashboard route
------

Copy the Counter route directory and rename it as Dashboard (location is src/routes/*):
![animated dashboard copy](http://test.przeorski.pl/book/903_copy_counter_to_dashboard.gif)


Next step is to find any related things to counter and then:

a) rename things from counter to dashboard

b) We will rename action called __COUNTER_INCREMENT__ to __DASHBOARD_VISITS_COUNT__ (this will be a number of visits to dashboard during one sessions without refreshing the browser)

![animated search for counter word](http://test.przeorski.pl/book/904_search_for_counter_in_dashboard_route.gif)

Generally all the code diffs below are simply copies of Counter's component renamed with Dashboard.

```
Source code of the new dashboard init creation: https://github.com/przeor/ReactC/commit/d3f5d0293045af4ce75522324c06c9bf44d16a90
```

## Create a dashboard component
------

We have to copy the directory from src/components/Counter and name it Dashboard. Then rename all the variables related to counter's route as on the below's example:

```
New file (copied from Counter example):
src/components/Dashboard/Dashboard.js
```
![code1](http://test.przeorski.pl/book/905_code1.png)

```
New file (copied from Counter example):
src/components/Dashboard/Dashboard.scss
```
![code2](http://test.przeorski.pl/book/906_code2.png)

```
New file (copied from Counter example):
src/components/Dashboard/index.js
```
![code3](http://test.przeorski.pl/book/907_code3.png)

Next step is to create a link in the Header component:

```
Modfiy the file:
src/components/Header/Header.js
```

![code4](http://test.przeorski.pl/book/908_code4.png)

Further we simply renaming the files and replacing the "counter" to "dashboard" (again):

```
Renaming and changes in:
.../Dashboard/containers/CounterContainer.js → ...ashboard/containers/DashboardContainer.js
```

![code5](http://test.przeorski.pl/book/909_code5.png)

```
Changes in:
src/routes/Dashboard/index.js
```
![code6](http://test.przeorski.pl/book/910_code6.png)

```
Renaming and changes in:
src/routes/Dashboard/modules/counter.js → src/routes/Dashboard/modules/dashboard.js
```
![code7](http://test.przeorski.pl/book/911_code7.png)


```
Changes in:
src/routes/index.js
```
![code8](http://test.przeorski.pl/book/912_code8.png)

Here above you need to modify the routes/index.js so we will add the dashboard route.

After you run the project with:
```
npm run start
```

You shall be able to find the below app running:

![913_dashboard_version1](http://test.przeorski.pl/book/913_dashboard_version1.gif)

As you can find above, there are two different routes with different reducers but with exactly the same feature - the counter has different number on both routes.

Let's improve the dashboard.

__All the above screenshots were made on that commit:__
```
https://github.com/przeor/ReactC/commit/29aad0775fd8b14eeeba519e7080f5871e881f4e
```

## Next steps in implementing our dashboard
------

In that ***Dashboard.js*** we do some little improvements in order to progress the development:
```
Changes in:
src/components/Dashboard/Dashboard.js
```
![914_code1](http://test.przeorski.pl/book/914_code1.png)


Below we have introduced statefull DashboardContainer - we need it to do this way as we are using componentDidMount for invoking the function called ***this.props.dashboardVisitIncrement()***.


#### IMPORTANT: The statefull DashboardContainer component is required here because our features requrire using a componentDidMount and we assume that in the components directory we want to have only "dumb components" and by that mean that all the React components in the "src/components" can have any states (and any React-related lifecycle methods like componentDidMount). In the src/components we will keep only stateless components (in other words they are also called dumb components).


```
Changes in:
src/routes/Dashboard/containers/DashboardContainer.js
```

![915_code2](http://test.przeorski.pl/book/915_code2.png)


In the modules/dashboard.js we have made some improvements and cleanup of unnecessary code that was copied initially from the Counter:

```
Changes in:
src/routes/Dashboard/modules/dashboard.js
```
![916_code3](http://test.przeorski.pl/book/916_code3.png)

... at this point you shall have an app which increments on componentDidMount of the Dashboard component as on the below animation:

![917_gif_works_dashboard_v2](http://test.przeorski.pl/book/917_gif_works_dashboard_v2_3.gif)

As you can find above, it still a very simple dashboard. The next step is to add ability of adding a list of dashboard items that has ability:
- add an item to the list
- remove an item to the list
- edit an item on the list

```
Source code from the screenshots: https://github.com/przeor/ReactC/commit/02ed268623f69ebed59a2d4b7bb3c1c44a5c3ffc
```


## Add/edit/delete item on the dashboard list
------

```
Changes in:
src/components/Dashboard/Dashboard.js
```

![918_code1](http://test.przeorski.pl/book/918_code1-2.png)

Above you need to add a listJSX generation code with use of:
```
const listJSX = props.dashboard.dashboardItems.map((item, i) => {
	return <h4 key={i}>{item.label}</h4>
})
```

and then modify the:
```
{props.dashboard.visitsCount}
```
... because as you can find below we have modified our reducer:


```
Changes in:
src/routes/Dashboard/modules/dashboard.js
```

![919_code2](http://test.przeorski.pl/book/919_code2.png)

As you can find above we have changed the old initialState:
```
// old code
const initialState = 0
```

with the new code:
```
const initialState = {
  visitsCount: 0,
  dashboardItems: [
    {key: 0, label: 'Angular'},
    {key: 1, label: 'JQuery'},
    {key: 2, label: 'Polymer'},
    {key: 3, label: 'ReactJS'}
  ]
}
```

So generally, we have changed simple integer initialState to an object, so as you can find as well above. We have improved also the DASHBOARD_VISITS_COUNT action:
```
// old codebase
[DASHBOARD_VISITS_COUNT]: (state, action) => state + action.payload
```

with new:
```
// updated codebase
[DASHBOARD_VISITS_COUNT]: (state, action) => { 
  state.visitsCount = state.visitsCount + action.payload
  return Object.assign({}, state)
}
```

As a final currently, we have a little improved dashboard with a list and the visitsCount also works as previously (alongside with improved dashboard's reducer):




```
Source code from the screenshots: https://github.com/przeor/ReactC/commit/8eef288af11d36d6485f00174f4b347ffd219508
```










