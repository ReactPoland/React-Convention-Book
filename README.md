RestaurantReason Project
=======================

Requirements
------------

Node `^4.0.0` or `^5.0.0` ([npm3](https://www.npmjs.com/package/npm3) recommended).

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone git@github.com:MrDanaK/RestaurantReason.git
$ cd RestaurantReason
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch, then open http://localhost:3000 in the browser
```

Structure
---------

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Express application (uses webpack middleware)
│   └── app.js               # Server application entry point
├── src                      # Application source code
│   ├── actions              # Redux action creators
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── layouts              # Components that dictate major page structure
│   ├── reducers             # Redux reducers
│   ├── routes               # Application route definitions
│   ├── store                # Redux store configuration
│   ├── utils                # Generic utilities
│   ├── views                # Components that live at a route
│   └── app.js               # Application bootstrap and rendering
└── tests                    # Unit tests
```