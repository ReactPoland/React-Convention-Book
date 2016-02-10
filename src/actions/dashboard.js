import {
  SET_DATE,
  RESET_DATE
} from '../constants/dashboard';

export default {
  setDate: (date) => {
    return {
      type: SET_DATE,
      payload: { date: date }
    }
  },
  resetDate: () => {
    return {
      type: RESET_DATE
    }
  }
}
