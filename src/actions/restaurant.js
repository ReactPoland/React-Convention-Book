import {
  RESTAURANTS_LIST
} from '../constants/restaurant';

export default {
  restaurantsList: (restaurants) => {
    return {
      type: RESTAURANTS_LIST,
      payload: restaurants
    }
  }
}
