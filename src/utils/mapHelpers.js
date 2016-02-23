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
};

const addItem = (map, newKey, newItem) => {
  const newMap = duplicate(map);
  newMap.set(newKey, newItem);
  return newMap;
};

const removeItem = (map, key) => {
  const newMap = duplicate(map);
  newMap.delete(key);
  return newMap;
};

const addMultipleItems = (map, items, key) => {
  const newMap = duplicate(map);
  items.forEach((item) => {
    newMap.set(item[key], item);
  });
  return newMap;
};

const toArray = (map) => {
  const array = [];
  map.forEach((item) => array.push(item));
  return array;
};

const getFromRange = (map, start, end) => {
  const newMap = new Map();
  const keys = Array.from(map.keys());
  const iterable = keys.slice(start, end);
  iterable.forEach((key) => {
    newMap.set(key, map.get(key));
  });
  return newMap;
}

export default {
  addItem,
  removeItem,
  addMultipleItems,
  getFromRange,
  toArray
};
