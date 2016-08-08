http://www.valvesoftware.com/company/Valve_Handbook_LowRes.pdf

# ReactJS Convention (ReactC.com)
## a free online handbook for React.JS Developers with a very opinionated and matured project structure


**** 
"So many books, so little time." ― Frank Zappa

"So many projects, so little time." - Kamil Przeorski
**** 


## Preface
------

In 2013 React was almost "nothing", today it's "something" for the JavaScript world. We developers, have so little time and so much work to do. The main problem with anyone who wants to learn how to make single-page-apps with React is that there __are no really conventions that one can follow__. We are running a React Webshop from mid 2014 and __we faced so many frustrations__. Mostly when a client who had already an MVP wanted us to expand based on his codebase. __No convention at all, many projects structure codebases and almost each one had it's weak points - this led us to many frustrations__. Another source of annoyance is also when you need to introduce a new developer to your "well known to you" codebase __and you want to make sure that he doesn't make any "newbie" mistakes__. In context of this preface a "newbie" means a someone who isn't familiarized to the project's structure. Because he is not familizarized with the project's configuration, then he is not really productive in his first month of work and additionally slows your progress down. __You need to teach him about your configuration so it takes you decent amount time to pass all your knowledge to your new teammate in the project__. The React Convention handbook helps you to save time on transfering knowledge about your project's structure to any new member. 

The main ReactC's goal is to create "ready to go" convention that you can share with your colleagues. 

__SHARE THE REACT CONVENTION IF YOU LIKE THE IDEA, it's 100% free__

We will familiarize your new teammate to your React's project sturcture so you will save a lot of money when following it. You will save 90% of your time on explaining why, how and what has been done with the project's codebase. 


### __The ReactC handbook is also a good for people who want to start a new project from scratch as it guides you how properly make new features in that starter and guarantees that any new future members will be introduced to your codebase quicker than with any other method__.

__PLEASE SEND US FEEDBACK, SO WE CAN IMPROVE THAT HANDBOOK BASED ON YOUR FINDINGS AND ISSUES - mail us with details at ReactConvention@mwp.io__



## How to use this handbook
------

The only requirement to get all the benefits mentioned in the preface is that you need to start your project with that react-redux-starter-kit:
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

![starter counter](http://test.przeorski.pl/book/902_starter_counter.gif)

This is a simple application with a counter, and throught this handbook you will implement other views and components which will help you understand whole codebase from a big picture perspective.

To explain the whole code structure, we will start with developing a new route called Dashboard with some basic features. When you will be done with it, then you will implement a registration and login which will make you sure that you know how to do it 100% just on your own.


First step is to clone the starter kit and start working on this commit (the handbook was written on that commit, so for better experience you shall work on the same one):
```
9a03e99c0dd2e7102d43264cc495bbdd4e10dcdd
```

... so you will be truly working on that starting codebase:
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

Have you cloned the repo to your local machine? Great, now you can follow the steps below.

## New dashboard route
------

Copy the Counter route directory and rename it as Dashboard (location is src/routes/*):
![animated dashboard copy](http://test.przeorski.pl/book/903_copy_counter_to_dashboard.gif)


###### IMPORTANT: from that point we will create a new component based on a copy of the Counter route that orginally is located at __src/routes/Counter__ in the the @davezuko's redux starter.

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
New file (copied from Counter example - you can click the diffs image to make it larger) :
src/components/Dashboard/Dashboard.js
```
![code1](http://test.przeorski.pl/book/905_code1.png)

```
New file (copied from Counter example - you can click the diffs image to make it larger):
src/components/Dashboard/Dashboard.scss
```
![code2](http://test.przeorski.pl/book/906_code2.png)

```
New file (copied from Counter example - you can click the diffs image to make it larger):
src/components/Dashboard/index.js
```
![code3](http://test.przeorski.pl/book/907_code3.png)

Next step is to create a link in the Header component:

```
Modfiy the file (you can click the diffs image to make it larger):
src/components/Header/Header.js
```

![code4](http://test.przeorski.pl/book/908_code4.png)

Further, we simply need to rename the files and replace all the "counter" matches to "dashboard" (again):

```
Renaming and changes in (you can click the diffs image to make it larger):
.../Dashboard/containers/CounterContainer.js → ...ashboard/containers/DashboardContainer.js
```

![code5](http://test.przeorski.pl/book/909_code5.png)

```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/index.js
```
![code6](http://test.przeorski.pl/book/910_code6.png)

```
Renaming and changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/modules/counter.js → src/routes/Dashboard/modules/dashboard.js
```
![code7](http://test.przeorski.pl/book/911_code7.png)


```
Changes in (you can click the diffs image to make it larger):
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

In the ***Dashboard.js*** file we will do some little improvements in order to progress the development:
```
Changes in (you can click the diffs image to make it larger):
src/components/Dashboard/Dashboard.js
```
![914_code1](http://test.przeorski.pl/book/914_code1.png)


Below we have introduced statefull DashboardContainer - we need it to do this way as we are using componentDidMount for invoking the function called ***this.props.dashboardVisitIncrement()***.


#### IMPORTANT: The statefull DashboardContainer component is required here because our feature (increment by one on every visit of the dashboard route) require using a componentDidMount and we assume that in the components directory we want to have only "dumb components". In the src/components we will keep only stateless components (in other words they are also called dumb components).


```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/containers/DashboardContainer.js
```

![915_code2](http://test.przeorski.pl/book/915_code2.png)


In the modules/dashboard.js we have made some improvements and cleanup of unnecessary code that was copied initially from the Counter:

```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/modules/dashboard.js
```
![916_code3](http://test.przeorski.pl/book/916_code3.png)

... at this point you shall have an app which increments on componentDidMount of the Dashboard component as on the animation below:

![917_gif_works_dashboard_v2](http://test.przeorski.pl/book/917_gif_works_dashboard_v2_3.gif)

As you can find above, it still a very simple dashboard. The next step is to add ability of adding a list of dashboard items that has ability:
- add an item to the list
- remove an item to the list
- edit an item on the list

```
Source code from the screenshots: https://github.com/przeor/ReactC/commit/02ed268623f69ebed59a2d4b7bb3c1c44a5c3ffc
```


## Mocked items list on the dashboard list
------

```
Changes in (you can click the diffs image to make it larger):
src/components/Dashboard/Dashboard.js
```

![918_code1](http://test.przeorski.pl/book/918_code1-2.png)

Above you need to add a listJSX mapping code with use of:
```
const listJSX = props.dashboard.dashboardItems.map((item, i) => {
	return <h4 key={i}>{item.label}</h4>
})
```

and then modify the:
```
{props.dashboard.visitsCount}
```
... all that changes above are required because we have modified our reducer's structure (as you can find below):

```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/modules/dashboard.js
```

![919_code2](http://test.przeorski.pl/book/919_code2.png)

As you can find above we have changed the old initialState:
```
// old dashboard reducer structure
const initialState = 0
```

with the new code:
```
// new dashboard reducer structure
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

So generally, we have changed simple integer initialState to an object, as you can find above. We have improved also the DASHBOARD_VISITS_COUNT action:
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

That __DASHBOARD_VISITS_COUNT__ change was required because as was written earlier, we have modified the initalState's structure of the dashboard reducer (so we need also to change the function that handles it).

As a final currently, we have a little improved dashboard with a list and the visitsCount also works as previously (alongside with improved dashboard's reducer):

![920_app_dashboard_with_list.gif](http://test.przeorski.pl/book/920_app_dashboard_with_list.gif)


```
Source code from the screenshots: https://github.com/przeor/ReactC/commit/8eef288af11d36d6485f00174f4b347ffd219508
```


## Add/edit item on the dashboard list
------

First thing to do is to prepare the action and handlers in the modules for __DASHBOARD_ADD_ITEM__ and __DASHBOARD_EDIT_ITEM__:


```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/modules/dashboard.js
```

![921_dashboard_reducer_actions](http://test.przeorski.pl/book/921_dashboard_reducer_actions.png)


As you can find above, we have added and exported two new actions:
```
export function dashboardAddItem (value) {
  return {
    type: DASHBOARD_ADD_ITEM,
    payload: value
  }
}

export function dashboardEditItem (value) {
  return {
    type: DASHBOARD_EDIT_ITEM,
    payload: value
  }
}
```

... then after an action is requrested from a Dashboard's component, we handle it with:
```
  [DASHBOARD_ADD_ITEM]: (state, action) => { 
    const mockedId = Math.floor(Date.now() / 1000)
    const newItem = {
      label: action.payload,
      id: mockedId
    }
    state.dashboardItems.push(newItem)
    return Object.assign({}, state)
  },
  [DASHBOARD_EDIT_ITEM]: (state, action) => { 
    const newLabel = action.payload.val
    const index = action.payload.editedItemIndex
    state.dashboardItems[index].label = newLabel
    return Object.assign({}, state)
  }
```

In both functions above, we are returining a new object with ***return Object.assign({}, state)***. Rest of the code shall be self-explaining for you.


```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/containers/DashboardContainer.js
```

![922_dashboard_container](http://test.przeorski.pl/book/922_dashboard_container.png)

Above we have simply added the functions that were created in the Dashboard/modules/dashboard.js file so we import __dashboardAddItem__ and __dashboardEditItem__ .. and continuation of the same file below:

```
continuation of src/routes/Dashboard/containers/DashboardContainer.js
```

![923_dashboard_container](http://test.przeorski.pl/book/923_dashboard_container.png)


On the above code base, we have added new functions called inputOnChange, onSubmit and itemOnEdit so we need improve our constructor as well:
```
  constructor(props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.itemOnEdit = this.itemOnEdit.bind(this)


    this.state = {
      inputValue: '',
      editedItemIndex: null
    }
  }
```
... the inputValue keeps the current value of a text input. In the editedItemIndex we keep an ID of currently edited item, if there is none in edit then we make it __null__.

Later we handle all the functions logic with:
```
  inputOnChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  itemOnEdit(itemIndex) {
    const editedItem = this.props.dashboard.dashboardItems[itemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: itemIndex })
  }

  onSubmit(e) {
    e.preventDefault()
    const val = this.state.inputValue
    const editedItemIndex = this.state.editedItemIndex
    if(val && editedItemIndex !== null) {
      this.props.dashboardEditItem({ val, editedItemIndex })
      this.setState({ inputValue: '', editedItemIndex: null })
    } else if(val) {
      this.props.dashboardAddItem(val)
      this.setState({ inputValue: '' })
    } else {
      alert(`Value can't be empty`)
    }
  }
```

There isn't nothing fancy so I won't describe too much in details (if you think it requires more detailed description then please mail us at ReactConvention@mwp.io). 

Final part is the __render method__:
```
  render () {
    return (
        <Dashboard {...this.props} 
          editedItemIndex={this.state.editedItemIndex}
          itemOnEdit={this.itemOnEdit}
          inputValue={this.state.inputValue}
          inputOnChange={this.inputOnChange}
          onSubmit={this.onSubmit} />
    );
  }
```
... we are passing some callbacks as __this.inputOnChange__, __this.onSubmit__ and __this.itemOnEdit__ - those callbacks are required to send to our dashboard "dumb component".


```
Changes in (you can click the diffs image to make it larger):
src/components/Dashboard/Dashboard.js
```

![924_dashboard_component_dumb](http://test.przeorski.pl/book/924_dashboard_component_dumb.png)

Above, we have improved our listJSX map function:
```
  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    let itemJSX;
    if(props.editedItemIndex === i) {
      itemJSX = <p><b><u>{item.label}</u></b></p>
    } else {
      itemJSX = <p>{item.label}</p>
    }
    return <h4 
            key={i} 
            onClick={props.itemOnEdit.bind(undefined,i)}
            style={{cursor: 'pointer'}}>
              {itemJSX}
          </h4>
  })
```

... so now it make an edited item bold and underlined. 

Next we have improved the render function:
```
  return (
  <div>
      <h2 className={classes.dashboardContainer}>
        Dashboard visits:
        {' '}
        <span className={classes['dashboard--green']}>
          {props.dashboard.visitsCount}
        </span>
      </h2>
    <form onSubmit={props.onSubmit}>
      <input 
        value={props.inputValue}
        type='input' 
        placeholder='type here a value' 
        style={{width: 300}}
        onChange={props.inputOnChange} />
      <input 
        type='submit' 
        value={ props.editedItemIndex === null ? 'Add New Item To The List' : 'Edit Item' } />
    </form>
    {listJSX}
  </div>
)}
```

We have added standard form and inputs - they are communicating with DashboardContainer with use of callbacks (the __value={props.inputValue}__ and __onChange={props.inputOnChange}__ take care of it). The submit button value is determined by the props.editedItemIndex - so if it is a null then that means that a user hasn't clicked any item, yet.

This is the end results of all the changes we've made above:

![925_edit_add_anim.gif](http://test.przeorski.pl/book/925_edit_add_anim.gif)

```
Source of the commit's screenshots: 
https://github.com/przeor/ReactC/commit/f836fd4f2eccec2a3740e875247abc7870efa245
```

## Reorder an item on the dashboard list

We will implement the reordering in a proper React way without using any external "reordering components".

Let's start from the reducers and actions that are related to the reordering feature:

```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/modules/dashboard.js
```

![926_reducer_action_reorder](http://test.przeorski.pl/book/926_reducer_action_reorder.png)

An explanation for the code from the diffs - you need to understand what we will send as a payload (__const reorder = action.payload__) in the function below:
```
  [DASHBOARD_REORDER_ITEM]: (state, action) => { 
    const reorder = action.payload
    const reorderItem = state.dashboardItems[reorder.start]
    let newDashboardItems = []
    state.dashboardItems.map((item, i) => {
      if(i === reorder.start) {
        return
      }

      // we need that if statement because
      // the behaviour is determined if someone is dragging
      // an item from higher to lower place on the list or vice versa
      if(reorder.end < reorder.start) {
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
        newDashboardItems.push(item)
      } else {
        newDashboardItems.push(item)
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
      }
    })
    state.dashboardItems = newDashboardItems
    return Object.assign({}, state)
  }
```

We will send an object with the following __start__ and __end__ variable as on the example below:

```
// just an example schema of
// const reorder = action.payload
// so you can see what values are sent to the DASHBOARD_REORDER_ITEM
{ 
  start: parseInt(this.state.draggedItemIndex),
  end: parseInt(droppedItemId)
}
```

The __start__ is a number of order in the __dashboardItems__ array. The __end__ variable is an order number of a dropped-on-the-item div (the id of an item that a user dropped on the dragged item). We map over all the items in our array and based on the dragging data (start and end) we create a new array called __newDashboardItems__.  Rest of the code shall be self-explained.


```
Changes in (you can click the diffs image to make it larger):
src/routes/Dashboard/containers/DashboardContainer.js
```

![927_dashboardContainer1](http://test.przeorski.pl/book/927_dashboardContainer1.png)

Above we have added __draggedItemIndex__ to the state which will be set in the __handleOnDragStart__ function. Beside that we are also binding this to the __handleOnDrop__ (here we handle login when a user drops a dragged div) and __handleOnDragOver__ (this function is more like placeholder, when you can add more custom logic if you want make this dragging functionality more fancy).

... and continuation of the __containers/DashboardContainer.js__:

![928_dashboardContainer2](http://test.przeorski.pl/book/928_dashboardContainer2.png)

From the above diffs we can find new functions related to the DnD:
```
  handleOnDragStart (e) {
    const id = e.target.id
    this.setState({ draggedItemIndex: id })
  }

  handleOnDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    // You can add here more logic if required
  }

  handleOnDrop (e) {
    const droppedItemId = e.currentTarget.id
    let reorderVal = { 
      start: parseInt(this.state.draggedItemIndex),
      end: parseInt(droppedItemId)
    }

    // the div ids have to be numbers to reorder correctly
    // and the start and end value has to be different (otherwise reorder is not required)
    const reorderIsCorrect = !isNaN(reorderVal.start) && !isNaN(reorderVal.end) && reorderVal.start !== reorderVal.end

    if(reorderIsCorrect) {
      this.props.dashboardReorderItems(reorderVal)
    }

    this.setState({ draggedItemIndex: null })
  }
```

The most important part to understand this code above is that the div has an id as a number (check the code from the __src/components/Dashboard/Dashboard.js__ which is listed below) and that number is an order in the __newDashboardItems__ array that is kept in the dashboard reducer.

Based on that assumption, we can use:
```
handleOnDragStart (e) {
  const id = e.target.id
  this.setState({ draggedItemIndex: id })
}
```

to set the start item. Below you can find how we get the final end __newDashboardItems__ number
```
handleOnDrop (e) {
  const droppedItemId = e.currentTarget.id
  let reorderVal = { 
    start: parseInt(this.state.draggedItemIndex),
    end: parseInt(droppedItemId)
  }
  // rest of the code below has been striped out
```

Rest of the code shall be self-explanied (if something is unclear, please contact us at ReactConvention@mwp.io).


```
Changes in (you can click the diffs image to make it larger):
src/components/Dashboard/Dashboard.js
```

![929_changes_in_dashboard_map](http://test.przeorski.pl/book/929_changes_in_dashboard_map.png)


```
  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    let itemJSX;
    if(props.editedItemIndex === i) {
      itemJSX = <p><b><u>{item.label}</u></b></p>
    } else {
      itemJSX = <p>{item.label}</p>
    }
    return <h4 
            id={i}
            draggable='true'
            onDragOver={props.handleOnDragOver}
            onDragStart={props.handleOnDragStart}
            onDrop={props.handleOnDrop}
            key={i} 
            onClick={props.itemOnEdit.bind(undefined, i)}
            style={{cursor: 'pointer'}}>
              {itemJSX}
          </h4>
  })
```

The last part is to add callbacks (onDragOver, onDragStart and onDrop), modify style and add the __id={i}__ (so we can take a DIV's id as an information required to make DnD works).


This is how the app shall behave after that all our changes:


![930_dashboard_reordering](http://test.przeorski.pl/book/930_dashboard_reordering.gif)

```
Source of the commit's screenshots: 
https://github.com/przeor/ReactC/commit/126d2ae53e89ba6731cd923311d6646bb543f8a1
```

#### Login with mocked data (front-end)

We will implement login functionality that works purely on front-end (later we will create a simple backend enpoint). First step is to prepare new session reducer which will be app-wise (it will be used all across the app).

```
Create a new directory at "src/modules" location
.. and then create a new file src/modules/session.js
```

###### IMPORTANT: we are creating this module directory in the main src/** location because that one reducer need to be available all across the app. In the session reducer we will keep all the actions and data related to our user session (like a token or login status).

![931_code1](http://test.przeorski.pl/book/931_code1.png)

Above we have created __SESSION_LOGIN_SUCCESS__ and __SESSION_LOGIN_FAIL__ actions.

The interesting part is the loginAsync function which looks like below:
```
export const loginAsync = (loginObj) => {
  return async (dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    }).then(() => {

      if(loginObj.user === 'przeor' && loginObj.password === 'mwp.io') {
        return 'www.mwp.io' // just a mocked token
      } else {
        return 'invalid' // mocked non successful login
      }
    })

    if(loginToken !== 'invalid') {
      dispatch(loginSuccess(loginToken))
      dispatch(push('/dashboard'))
    } else {
      dispatch(loginFail(loginToken))
    }
    
  }
}
```
The function received the __loginObj__ which is composed of two keys:
```
loginObj.user
loginObj.password
```
That data will be sent to the backend server (after we will unmock now), currenly we only check if the logins are correct with:
```
if(loginObj.user === 'przeor' && loginObj.password === 'mwp.io') {
```


Also as you can find, we have created asynchronous function (__return async (dispatch, getState) => {__) which awaits on the promise resolve after 200 milliseconds timeout (currently it's a mock, later it will be real POST to the server). Then depends if you have provided correct login details, it returns:
```
    }).then(() => {

      if(loginObj.user === 'przeor' && loginObj.password === 'mwp.io') {
        return 'www.mwp.io' // just a mocked token
      } else {
        return 'invalid' // mocked non successful login
      }
    })
```
The __'invalid'__ means, that you have provided incorrect login details (later that will be sent back from the server).

The last executing code of the __loginAsync__ is:
```
    if(loginToken !== 'invalid') {
      dispatch(loginSuccess(loginToken))
      dispatch(push('/dashboard'))
    } else {
      dispatch(loginFail(loginToken))
    }
```

The __dispatch__ comes from the __react-thunk__ - that means, that the loginAsync is returned immediately and waits for lazy evaluation (in our case on a respond from the server if the user has provided correct or incorrect details).

On a valid details, we dispatch two actions:
```
dispatch(loginSuccess(loginToken))
dispatch(push('/dashboard'))
```

One to loginSuccess with the __loginToken__ value and the second the __push__ which comes from the __react-router-redux__ (__import {push} from 'react-router-redux'__).





