import { createReducer } from '../utils';

import {
   RESTAURANTS_LIST
} from '../constants/restaurant';
// import { Restaurant } from 'models';



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
  [RESTAURANTS_LIST]: (state, payload) => {
    const keys = Object.keys(payload);
    const pathIndex = keys.indexOf('$__path');
    if(pathIndex !== -1) {
      keys.splice(pathIndex, 1);
    }



    /// zamiast new StaffMember MUSISZ STWORZYC NOWY MODEL RESTAURACJI
    /// w src/models/Restaurant.js

    /// TU ZAMIAST mapować, to zwróć obiekt po prostu

    let reducerMOCK = {
      name: 'Restaurant Name',
      positions: ['REDUCER Chef', 'Vice Chef', 'Cook', 'Waiter/Waitress', 'Bartender'],
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

    return Object.assign({}, reducerMOCK);// new Restaurant(payload);
    
    ///////////
    /// smietnik:
    const items = keys.map((key) => { // <<< mapa do kasacji

    /*
    payload[key] = {
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
    }
    */
      return new StaffMember(payload[key]);
    });
  }
});
