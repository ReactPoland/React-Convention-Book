import { createReducer } from '../utils';

// import {
  // import constants later
// }

const initialState = {
  name: 'Restaurant Name',
  availablePositions: [{
    title: 'Chef',
    name: 'chef'
  }, {
    title: 'Vice Chef',
    name: 'vicechef'
  }, {
    title: 'Cook',
    name: 'cook'
  }, {
    title: 'Waiter',
    name: 'waiter'
  }, {
    title: 'Waitress',
    name: 'waitress'
  }, {
    title: 'Bartender',
    name: 'bartender'
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
