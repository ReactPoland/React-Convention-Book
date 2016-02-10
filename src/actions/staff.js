import {
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFF,
  SEND_MESSAGE
} from '../constants/staff';

export default {
  addStaff: (newStaff) => {
    return {
      type: ADD_STAFF,
      payload: newStaff
    }
  },
  editStaff: (staffId, editedStaff) => {
    return {
      type: EDIT_STAFF,
      payload: { staffId, editedStaff }
    }
  },
  deleteStaff: (staffId) => {
    return {
      type: DELETE_STAFF,
      payload: staffId
    }
  }
}
