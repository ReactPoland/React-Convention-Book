import { createReducer } from '../utils';

import {
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFF
} from '../constants/staff';

const staffList = [
  {
    "Id": "1162953910005334016",
    "CreatedAt": "2016-01-15T05:48:51.112472-05:00",
    "UpdatedAt": "2016-01-15T05:48:51.112472-05:00",
    "FirstName": "Jim",
    "LastName": "Test1",
    "ImageURL": "",
    "Email": "staff_member@mailinator.com",
    "Password": "",
    "Verified": false,
    "Gender": "male",
    "Position": "Chef"
  },
  {
    "Id": "1162953910005334015",
    "CreatedAt": "2016-01-15T05:48:51.112472-05:00",
    "UpdatedAt": "2016-01-15T05:48:51.112472-05:00",
    "FirstName": "John",
    "LastName": "Test2",
    "ImageURL": "",
    "Email": "staff_member2@mailinator.com",
    "Password": "",
    "Verified": false,
    "Gender": "male",
    "Position": "Vice Chef"
  }
];

export default createReducer(staffList, {
  [ADD_STAFF]: (state, newMember) => {
    return [
      ...state,
      newMember
    ];
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
  }
});
