/**
 * 1. each function always return new map
 * 2. perhaps not all cases are covered (I wrote it in few minutes)
 * 3. feel free to add more methods
 * 4.
 *
 *
 */

const duplicate = (map) => {
  const newMap = new Map();
  map.forEach((item, key) => newMap.set(key, item));
  return newMap;
}

const addItem = (map, newKey, newItem) => {
  const newMap = duplicate(map);
  newMap.set(newKey, newItem);
  return newMap;
}

const removeItem = (map, key) => {
  const newMap = duplicate(map);
  newMap.delete(key);
  return newMap;
}

const toArray = (map) => {
  const array = [];
  map.forEach((item) => array.push(item));
  return array;
}

export default {
  addItem,
  removeItem,
  toArray
};
