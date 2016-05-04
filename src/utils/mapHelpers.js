const duplicate = (map) => {
  console.info('########');
  console.info('########');
  console.info('########');
  const newMap = new Map();
  map.forEach((item, key) => {
    console.info('item', item);
    console.info('key', key);
    console.info('TRUE?', key === item['_id']);
    if(item['_id']) {
      newMap.set(item['_id'], item);
    }
  });
  console.info('########');
  console.info('########');
  console.info('TERAZ:');
  console.info('TERAZ:');
  console.info('TERAZ:');
  console.info(newMap);
  console.info('########');
  return newMap;
};

const addMultipleItems = (map, items) => {
  const newMap = duplicate(map);

  Object.keys(items).map((itemIndex) => {
    let item = items[itemIndex];
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
