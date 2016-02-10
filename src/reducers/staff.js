import { createReducer } from '../utils';

import {
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFF,
  SEND_MESSAGE
} from '../constants/staff';

const staffList = [
  {
    "Id": "1162953910005334016",
    "CreatedAt": "2016-01-15T05:48:51.112472-05:00",
    "UpdatedAt": "2016-01-15T05:48:51.112472-05:00",
    "FirstName": "Jim",
    "LastName": "Test1",
    "ImageURL": "",
    "Email": "irontest_athlete@mailinator.com",
    "Password": "",
    "Verified": false,
    "TrainerId": null,
    "AthleteId": "1162953910089285632",
    "UnitPreference": "lbs",
    "Gender": "male",
    last_workout: {
      date: 'Nov 10, 2015: Powerlifters A Day'
    },
    next_workout: {
      date: 'Nov 12, 2015: Powerlifters B Day'
    },
    notes: [
      { id: 0, date: '2015-12-10T12:00:00.000Z', text: 'Lorem ipsum dolor sit amet', status: 'success' },
      { id: 1, date: '2015-12-15T12:00:00.000Z', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing', status: '' },
      { id: 2, date: '2015-12-18T12:00:00.000Z', text: 'Lorem ipsum dolor, consectetur adipisicing', status: 'danger' },
      { id: 3, date: '2015-12-19T12:00:00.000Z', text: 'Lorem ipsum sit amet, consectetur', status: '' },
      { id: 4, date: '2015-12-19T12:00:00.000Z', text: 'Lorem ipsum sit amet', status: 'danger' },
      { id: 5, date: '2015-12-19T12:00:00.000Z', text: 'Lorem dolor sit amet, consectetur adipisicing', status: '' }
    ],
    chat: [
      { id: 0, author: 'trainer', text: 'Lorem ipsum dolor sit amet, adipisicing elit. Nam, ducimus, quia deserunt nulla cumque iste. Eaque inventore nisi ad!'},
      { id: 1, author: 'trainee', text: 'Lorem ipsum dolor sit amet, adipisicing elit.'},
      { id: 2, author: 'trainer', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, ducimus, quia deserunt quibusdam nulla cumque iste. Eaque inventore nisi ad!'},
      { id: 3, author: 'trainee', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, enim!'}
    ]
  },
  {
    "Id": "1162953910005334015",
    "CreatedAt": "2016-01-15T05:48:51.112472-05:00",
    "UpdatedAt": "2016-01-15T05:48:51.112472-05:00",
    "FirstName": "John",
    "LastName": "Test2",
    "ImageURL": "",
    "Email": "irontest_athlete@mailinator.com",
    "Password": "",
    "Verified": false,
    "TrainerId": null,
    "AthleteId": "1162953910089285632",
    "UnitPreference": "lbs",
    "Gender": "male",
    last_workout: {
      date: 'Nov 10, 2015: Powerlifters A Day'
    },
    next_workout: {
      date: 'Nov 12, 2015: Powerlifters B Day'
    },
    notes: [
      { id: 0, date: '2015-12-10T12:00:00.000Z', text: 'Lorem ipsum dolor sit amet', status: 'success' },
      { id: 1, date: '2015-12-15T12:00:00.000Z', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing', status: '' },
      { id: 2, date: '2015-12-18T12:00:00.000Z', text: 'Lorem ipsum dolor, consectetur adipisicing', status: 'danger' },
      { id: 3, date: '2015-12-19T12:00:00.000Z', text: 'Lorem ipsum sit amet, consectetur', status: '' },
      { id: 4, date: '2015-12-19T12:00:00.000Z', text: 'Lorem ipsum sit amet', status: 'danger' },
      { id: 5, date: '2015-12-19T12:00:00.000Z', text: 'Lorem dolor sit amet, consectetur adipisicing', status: '' }
    ],
    chat: [
      { id: 0, author: 'trainer', text: 'Lorem ipsum dolor sit amet, adipisicing elit. Nam, ducimus, quia deserunt nulla cumque iste. Eaque inventore nisi ad!'},
      { id: 1, author: 'trainee', text: 'Lorem ipsum dolor sit amet, adipisicing elit.'},
      { id: 2, author: 'trainer', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, ducimus, quia deserunt quibusdam nulla cumque iste. Eaque inventore nisi ad!'},
      { id: 3, author: 'trainee', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, enim!'}
    ]
  }
];

export default createReducer(staffList, {
  [ADD_STAFF]: (state, newClient) => {
    return [
      ...state,
      {
        ...newClient,
        last_workout: {
          date: 'None'
        },
        next_workout: {
          date: 'None'
        },
        notes: [],
        chat: []
      }
    ];
  },
  [EDIT_STAFF]: (state, payload) => {
    //Map staff objects' IDs into new array and find index of staff who'll be edited
    let staffIndex = state.map(staff => staff.Id).indexOf(payload.staffId);
    //Get his object from state
    let staffObject = state[staffIndex];
    //Insert updated staff's info into state
    return [
      ...state.slice(0, staffIndex),
      {
        ...staffObject,
        ...payload.editedClient
      },
      ...state.slice(staffIndex + 1)
    ];
  },
  [DELETE_STAFF]: (state, staffId) => {
    //Map staff objects' IDs into new array and find index of staff that'll be deleted
    let staffIndex = state.map(staff => staff.Id).indexOf(staffId);
    //Delete staff if it's still in state
    if (state[staffIndex]) {
      return [
        ...state.slice(0, staffIndex),
        ...state.slice(staffIndex + 1)
      ];
    } else {
      return [...state];
    }
  },
  [SEND_MESSAGE]: (state, payload) => {
    //Map staff objects' IDs into new array and find index of staff who'll receive message
    let staffIndex = state.map(staff => staff.Id).indexOf(payload.staffId);
    //Get his object from state
    let staffObject = state[staffIndex];
    //Create new message object
    staffObject.chat.push({
      author: 'trainer',
      id: staffObject.chat.length, //Temporary, we should keep track of IDs
      text: payload.message
    });
    //Add message to state
    return [
      ...state.slice(0, staffIndex),
      staffObject,
      ...state.slice(staffIndex + 1)
    ];
  }
});
