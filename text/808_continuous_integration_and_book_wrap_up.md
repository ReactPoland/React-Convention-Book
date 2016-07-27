### Continuous integration with unit and behavioral tests. Pub App Wrap Up.

We made it - congratulations! We have created a full-stack app which runs under a certain domain name (in the book case reactjs.space). The missing part in the whole setup are the deployments processes. Deployments should be zero downtime. We need to have a redundant servers of our application. 

We also missing some steps in our app to make it professionally work as minification, unit and behavioral tests.

In that chapter we will roughly describe options how to make this stuff working. Rest of the missing pieces are left for you as a home work.


#### When to write unit and behavioral tests

Generally, there are some advices about when to write unit and/or behavioral tests. 

We in MobileWeb Pro very have often have clients who run startups. As a general governance for them we advice:

a) if your startup is looking for traction and you need your product in order to make it then don't worry about tests

b) after you created your MVP (Minimum Viable Product) then you MUST have those tests when expanding your application. 

c) if you are well estabilished company which is building an app for your clients and you know their needs very well then you must have tests

First two points (a-b) are related to startups and young companies. The third point (c) is related mostly for well estabilished companies.

It's really overkill when you are building a mobile/web app and you don't have those stuff in your setup.

#### React Convention 

There is a project which shows fully, how the full-stack development setup shall be looking like:

```
http://ReactConvention.com
```

Visit this website and learn how integrate your app with unit and behavioral tests and learn up to date best conventions about how to make react redux applications.

#### Karma for testing

We won't guide you to setting up the tests thorughout this chapter, because it's not in the scope of the book. Aim of this chapter is more likely to present you online resources which will help you to understand big picture. We will try to answer a question.

Karma is the one of most popular tool for unit and behavioral tests. The main goal is to bring a productive testing environment while working on any application.

There are many features that you are provided with by using this test runner. There is a nice video that is explaining big picture about Karma at their main website:
```
https://karma-runner.github.io
```

Some of the main features are:

a) Test on Real Devices - you can use real browsers and real devices such as phones, tablets or PhantomJS (PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG) to run the tests. Different enviroments, but one tool that run it all.

b) Remote Control - you can run the tests remotely, for example on each save from your IDE so you don't have to do it manually

c) Testing Framework Agnostic - you can write your tests  in Jasmine, Mocha, QUnit and other frameworks. It's totally up to you.

d) Continuous Integration - Karma works great with CI tools like Jenkins, Travis or CircleCI.


#### How to write unit and behavioral tests

Let's provide an example how to setup properly a project in order to have an ability to write tests.

Visit the Github repo of very popular redux starter kit:
```
https://github.com/davezuko/react-redux-starter-kit
```

Then visit the package.json file of this repository. We can find out there what are possible commands/scripts:
```
  "scripts": {
    "clean": "rimraf dist",
    "compile": "better-npm-run compile",
    "lint": "eslint src tests server",
    "lint:fix": "npm run lint -- --fix",
    "start": "better-npm-run start",
    "dev": "better-npm-run dev",
    "dev:no-debug": "npm run dev -- --no_debug",
    "test": "better-npm-run test",
    "test:dev": "npm run test -- --watch",
    "deploy": "better-npm-run deploy",
    "deploy:dev": "better-npm-run deploy:dev",
    "deploy:prod": "better-npm-run deploy:prod",
    "codecov": "cat coverage/*/lcov.info | codecov"
  },
```

As you can find there that after npm test you it runs the following command:
```
    "test": {
      "command": "babel-node ./node_modules/karma/bin/karma start build/karma.conf",
      "env": {
        "NODE_ENV": "test",
        "DEBUG": "app:*"
      }
    }
```

From there you can find the configuration file of karma, that is located at ***build/karma.conf*** so the link for that file:
```
https://github.com/davezuko/react-redux-starter-kit/blob/master/build/karma.conf.js
```

and it's content is (July 2016):
```
import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
```

As you can find in that karma.conf.js they are using Mocha (check the line with ***"frameworks: ['mocha']***"). Rest options used in that config files are described in the documentation that is available at http://karma-runner.github.io/1.0/config/configuration-file.html ... if you are interested in learning the Karma configuration then it's go to place to learn all the options that are located in the linked karma.conf.js file.


#### What is Mocha and why you need it

In that Karma config file, we have found that it uses Mocha as JS testing framework (https://mochajs.org/). Let's analyze the codebase.

We can find at the config/index.js file that "dir_test : 'tests'" so based on that variable the Karma's config knows that the Mocha's tests are located in the "tests/test-bundler.js" file.

Let's see what is in the tests directory:
```
https://github.com/davezuko/react-redux-starter-kit/tree/master/tests
```

as you can find the in the test-bundler.js there plenty of dependencies:
```
// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import 'babel-polyfill'
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()
```

Let's roughly describe what is used there:

a) Babel-polyfill emulate a full ES6 environment

b) Sinon is a standalone and test framework agnostic JavaScript test spies, stubs and mocks. 

Spies are useful if in a tested piece of code you call for other external's services. You can check if it was called, what parameters it had, if it returned something or even how many times it was called!

Stubs are very likely like spies. Biggest difference is that they replace the target function. They also replace called code with custom behaviour (replacing it) such as throwing exceptions or returning a value. They are also able to call a callback function that has been provided as a paramater.Stubs code returns a specified result.


Mocks are kind of "the smarter stubs". Mocks are used for asserting data and should never return data, when a stub are used simply for returning data and should never assert. Mocks can can file your tests (when asserting), while the stubs can't.

c) Chai is the BDD / TDD assertion framework for node.js and the browser. In that example it has been paired with the Mocha testing framework.


#### Testing CoreLayout step-by-step

Let's analyze the CoreLayout.spec.js tests - this component has similar role as the CoreLayout in the Publishing App so it's a good way to describe how you can start writing tests for our application.

The CoreLayout tests file location (July 2016):
```
https://github.com/davezuko/react-redux-starter-kit/blob/master/tests/layouts/CoreLayout.spec.js
```

and it's content:
```
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })
})
```


The react-addons-test-utils makes easy to test React components with Mocha. The methods that we use in above example are is "shallow rendering":
```
https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
```

This feature helps us test the render function and a result of rendering a one level deep in our components. Then we can assert facts about what its render method returns. As you can find below:
```
function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}
```

First we provide a component in the shallowRender method (in this example it will be CoreLayout). Later we use a method ***.render*** and then we reutrn the output with use of renderer.getRenderOutput.

In our case that function is called here:
```
describe('(Layout) Core', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })
})
```

So you can find that the ***_component*** contains the result of the ***renderer.getRenderOutput***. This value is asserted here:
```
expect(_component.type).to.equal('div')
```
In that certain test we test our code if it returns a div. But if you will visit the documentation then you can find code example:
```
<div>
  <span className="heading">Title</span>
  <Subcomponent foo="bar" />
</div>
```

... and assertion example:
```
var renderer = ReactTestUtils.createRenderer();
result = renderer.getRenderOutput();
expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```

As you can find in above two examples, you can expect a type as div or you can expect more specific information about the CoreLayout return (depending on your needs).


The first test asserts the type of a component (if it is a div), the second example test asserts if a CoreLayout returns correct components that are following:
```
[
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]
```

First test is an unit one, because this isn't testing exactly if users see a correct thing. Second one is a behavioral test.

Generally, the PacktPub has many books related to BDD (Behavior-driven development) and TDD (Test-driven development) development.


#### Continous integration with Travis

In the given example, you can find a .yml file at:
```
https://github.com/davezuko/react-redux-starter-kit/blob/master/.travis.yml
```

This is configuration file for Travis. What it is? It's a hosted CI service used to build and test software. Generally, it's a tool that is free for open source projects to use. If you want a hosted Travis CI for private projects then their fees apply. 

Configuration for Travis is made by adding the .travis.yml file which was mentioned above. The YAML form is a text file which placed to the root directory of your project. This file describe whole steps that has to be done to test, install and build a project.

The Travis CI goal is to on every commit to your GitHub account, to run the tests and when the tests are passing you can deploy the app to a staging server on an Amazon AWS. The continous integration is not in the scope of that book so if you are interested in adding this step to the whole Publishing App project there are books related to this as well.


#### Summary

So far we have done a lot of progress, but what you need to do as a home work to wrap up the Publishing App in 100% with all the missing pieces described in that chapter?


