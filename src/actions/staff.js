import {
  STAFF_LIST,
  ADD_STAFF,
  EDIT_STAFF,
  DELETE_STAFFE
} from '../constants/staff';

export default {
  staffList: (staff) => {
    return {
      type: STAFF_LIST,
      payload: staff
    };
  },
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
