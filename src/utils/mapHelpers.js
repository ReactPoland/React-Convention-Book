const duplicate = (map) => {
  const newMap = new Map();
  map.forEach((item, key) => { 
    newMap.set(key, item);
  });
  return newMap;
};

const addMultipleItems = (map, items) => {
  console.info('map', map);
  console.info('--------------');
  
  const newMap = duplicate(map);

  items.forEach((item) => {
    newMap.set(item['_id'], item);
  });
  return newMap;
};

const addItem = (map, newKey, newItem) => {
  const newMap = duplicate(map);
  newMap.set(newKey, newItem);
  return newMap;
};

const deleteItem = (map, key) => {
  const newMap = duplicate(map);
  newMap.delete(key);

  return newMap;
};


export default {
  addItem,
  deleteItem,
  addMultipleItems
};
