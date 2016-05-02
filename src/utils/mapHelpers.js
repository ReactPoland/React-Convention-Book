const duplicate = (map) => {
  const newMap = new Map();
  console.info(1);
  map.forEach((item, key) => { 
  	console.info(2);
    newMap.set(key, item);
  });
  console.info(3);
  return newMap;
};

const addMultipleItems = (map, items, key = 'id') => {
  const newMap = duplicate(map);
  console.info(11);

  console.info('items');
  console.info(items);
  items.forEach((item) => {
  	console.info(12);
    newMap.set(item[key], item);
  });
  console.info(13);
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
