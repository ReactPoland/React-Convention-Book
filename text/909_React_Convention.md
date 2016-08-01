http://www.valvesoftware.com/company/Valve_Handbook_LowRes.pdf

#### ReactConvention - handbook for React Developers


**** 
"So many books, so little time." ― Frank Zappa

"So many projects, so little time." - Kamil Przeorski
**** 


## Preface

In 2013 React was almost "nothing", today it's "something" for the JavaScript world. We developers, have so little time and so much work to do. The main problem with anyone who wants to learn how to make single-page-apps with React is that there __are no really conventions that one can follow__. We are running a React Webshop from mid 2014 and __we faced so many frustrations__. Mostly when a client who had already an MVP wanted us to expand based on his codebase. __No convention at all, many projects structure codebases and almost each one had it's weak points - this led us to many frustrations__. Another source of annoyance is also when you need to introduce a new developer to your "well known to you" codebase __and you want to make sure that he doesn't make any "newbie" mistakes__. In context of this preface a "newbie" means a someone who isn't familiarized to the project's structure. Because he is not familizarized with the project's configuration, then he is not really productive in his first month of work and additionally slows your progress down. __You need to learn him about your configuration so it takes decent amount time to pass all your knowledge to your new teammate in the project__. The React Convention handbook helps you to save time on transfering knowledge about your project's structure to any new member. 

The main ReactC's goal is to create "ready to go" convention that you can share with your colleagues. 

__SHARE THE REACT CONVETION IF YOU LIKE THE IDEA__

We will familiarize your new teammate to your React's project sturcture so you will save a lot of money when following it. You will save 90% of your time on explaining why, how and what has been done with the project's codebase. 

__The handbook is also a good for people who want to start a new project from scratch__.

__PLEASE USE FEEDBACK FEATURE, SO WE CAN IMPROVE THAT HANDBOOK BASED ON YOUR FINDINGS (https://github.com/przeor/selection-sharer)__



## How to use this handbook

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

In a default starter kit from the @davezuko, you can find a home page and a counter component which looks as following:

![starter counter](http://test.przeorski.pl/book/902_starter_counter3.png)

This is a simple application with a counter, and throught this handbook you will implement other views and components which will help you understand whole codebase from a big picture perspective.

To explain the whole code structure, we will start with developing a new route called Dashboard with some basic features. When you will be done with it, then you will implement a registration and login which will make you sure that you know how to do it 100% just on your own.


First step is to clone the starter kit and start working on this commit (the handbook was written on that commit, so for better experience you shall work on the same one):
```
3fabc5f49272aa93960461e2d1abd6800e02e341
```

... so you you will be truly working on that starting codebase:
```
https://github.com/davezuko/react-redux-starter-kit/tree/3fabc5f49272aa93960461e2d1abd6800e02e341
```

After you have cloned the repo and you are at the same commit as me, then we can continue with the fun.


#### General client codebase structure

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


#### New dashboard route

Copy the Counter route directory and rename it as Dashboard:

http://test.przeorski.pl/book/903_copy_counter_to_dashboard.gif

![animated dashboard copy](http://test.przeorski.pl/book/903_copy_counter_to_dashboard.gif)
(animated)













