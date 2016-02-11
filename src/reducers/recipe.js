import { createReducer } from '../utils';

// import {
  // import constants later
// }

// model is completely imporvised for now
// MAKE IT RIGHT LATER!
const initialState = {
  recipes: [{
    id: "7003244936931878",
    title: 'Sandwich',
    price: 12.25,
    description: "Lorem ipsum In veniam non laboris in aliquip tempor et tempor qui fugiat aliqua officia.",
    ingredients: [{
      title: 'Bread',
      amount: 1,
      unit: 'piece'
    }, {
      title: 'Ham',
      amount: 25,
      unit: 'g'
    }, {
      title: 'Butter',
      amount: 5,
      unit: 'g'
    }]
  }, {
    id: "7975821618456393",
    title: 'Spaghetti Bolognese',
    price: 15,
    description: 'Lorem ipsum Sit eu magna ad qui nisi enim fugiat cupidatat in.',
    ingredients: [{
      title: 'Pasta',
      amount: 1,
      unit: 'bag'
    }, {
      title: 'Meat',
      amount: 500,
      unit: 'g'
    }, {
      title: 'Tomato Sauce',
      amount: 100,
      unit: 'ml'
    }]
  }, {
    id: "7016743689309806",
    title: 'Salad',
    price: 30,
    description: "Lorem ipsum Dolore ad nostrud quis elit ut consequat do non cupidatat.",
    ingredients: [{
      title: 'Salad',
      amount: 1,
      unit: 'kg'
    }]
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
