import { createReducer } from '../utils';

import {
  STAFF_LIST,
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFF
} from '../constants/staff';

import mapHelpers from 'utils/mapHelpers';
import { StaffMember } from 'models';

const initialState = new Map();

export default createReducer(initialState, {
  [STAFF_LIST]: (state, payload) => {
    const keys = Object.keys(payload);
    const pathIndex = keys.indexOf('$__path');
    if(pathIndex !== -1) {
      keys.splice(pathIndex, 1);
    }

    const items = keys.map((key) => {
      return new StaffMember(payload[key]);
    });

    return mapHelpers.addMultipleItems(state, items);
  },
  [ADD_STAFF]: (state, payload) => {
    return mapHelpers.addItem(state, payload.id, payload);
  }
  // [ADD_STAFF]: (state, newMember) => {
  //   return [
  //     ...state,
  //     newMember
  //   ];
  //   return [
  //     ...state,
  //     {
  //       ...newClient,
  //       last_workout: {
  //         date: 'None'
  //       },
  //       next_workout: {
  //         date: 'None'
  //       },
  //       notes: [],
  //       chat: []
  //     }
  //   ];
  // },
  // [EDIT_STAFF]: (state, payload) => {
  //   //Map staff objects' IDs into new array and find index of staff who'll be edited
  //   let staffIndex = state.map(staff => staff.Id).indexOf(payload.staffId);
  //   //Get his object from state
  //   let staffObject = state[staffIndex];
  //   //Insert updated staff's info into state
  //   return [
  //     ...state.slice(0, staffIndex),
  //     {
  //       ...staffObject,
  //       ...payload.editedClient
  //     },
  //     ...state.slice(staffIndex + 1)
  //   ];
  // },
  // [DELETE_STAFF]: (state, staffId) => {
  //   //Map staff objects' IDs into new array and find index of staff that'll be deleted
  //   let staffIndex = state.map(staff => staff.Id).indexOf(staffId);
  //   //Delete staff if it's still in state
  //   if (state[staffIndex]) {
  //     return [
  //       ...state.slice(0, staffIndex),
  //       ...state.slice(staffIndex + 1)
  //     ];
  //   } else {
  //     return [...state];
  //   }
  // }
});
