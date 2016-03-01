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

const checkKeyType = (mapToCheck, keyToCheck) => {
  // this function checks if a key is an INT or STRING in order to make delete more robust
  let firstElem = mapToCheck.values().next();
  if(isNaN(firstElem.id) && isNaN(keyToCheck)) {
    return keyToCheck;
  } else if (isNaN(firstElem.id) && !isNaN(keyToCheck)) {
    return keyToCheck.toString();
  } else alert("mapHelpers/checkKeyType error") // just in case
}

const removeItem = (map, key) => {
  key = checkKeyType(map, key);
  const newMap = duplicate(map);
  newMap.delete(key);

  return newMap;
};

const addMultipleItems = (map, items, key = 'id') => {
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
