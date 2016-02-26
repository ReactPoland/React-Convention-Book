import { createReducer } from '../utils';

// import {
  // import constants later
// }

const initialState = {
  name: 'Restaurant Name',
  positions: ['Chef', 'Vice Chef', 'Cook', 'Waiter/Waitress', 'Bartender'],
  locations: [{
    id: 321654987,
    name: 'NY',
    title: '548 Wide St., 25487-4565 New York'
  }, {
    id: 3216547898,
    name: 'DC',
    title: '45 Tree Av., 13254 Washington D.C.'
  }, {
    id: 46544055,
    name: 'NM',
    title: '874 Long St., 99999 New Mexico'
  }]
};

export default createReducer(initialState, {
  // add action handlers when needed
});
