import { createReducer } from '../utils';

// import {
  // import constants later
// }

// model is completely imporvised for now
// MAKE IT RIGHT LATER!
const initialState = {
  menus: [{
    id: "27324184332974255",
    createdAt: new Date(),
    title: 'Vegetarian menu',
    description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
    sections: [
    // {
    //   id: "9838384301401675",
    //   title: 'Breakfast',
    //   items: [{
    //     id: "7016743689309806",
    //     title: 'Salad',
    //     description: 'Lorem ipsum Ex voluptate officia incididunt nostrud do minim consectetur culpa sint dolore culpa non ullamco.'
    //   }]
    // }
    ]
  }, {
    id: "5042458197567612",
    createdAt: new Date(2015, 5, 7),
    title: 'Chef recommends',
    description: 'Lorem ipsum Consectetur anim Duis tempor quis pariatur aute est magna in qui dolore.',
    sections: [{
      id: "5999823408201337",
      title: 'Breakfast',
      items: [{
        id: "7003244936931878",
        title: 'Sandwich',
        description: 'Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.'
      }]
    }, {
      id: "5999823408201337",
      title: 'Dinner',
      items: [{
        id: "7975821618456393",
        title: 'Spaghetti Bolognese',
        description: ''
      }]
    }]
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
