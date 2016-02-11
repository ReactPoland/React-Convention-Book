import { createReducer } from '../utils';

// import {
  // import constants later
// }

const initialState = {
  name: 'Restaurant Name',
  positions: [{
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
  }],
  locations: [{
    name: 'NY',
    title: '548 Wide St., 25487-4565 New York'
  }, {
    name: 'DC',
    title: '45 Tree Av., 13254 Washington D.C.'
  }, {
    name: 'NM',
    title: '874 Long St., 99999 New Mexico'
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
