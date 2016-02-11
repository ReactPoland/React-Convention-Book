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
    dishes: [{
      id: "7016743689309806",
      title: 'Salad'
    }]
  }, {
    id: "5042458197567612",
    createdAt: new Date(2015, 5, 7),
    title: 'Chef recommends',
    description: 'Lorem ipsum Consectetur anim Duis tempor quis pariatur aute est magna in qui dolore.',
    dishes: [{
      id: "7975821618456393",
      title: 'Spaghetti Bolognese'
    }, {
      id: "7003244936931878",
      title: 'Sandwich'
    }]
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
