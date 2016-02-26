export default {
  makeArray
}

function makeArray({object, name}) {
  let items = [];
  if(object[name]) {
    delete object[name].$__path;

    for(let key in object[name]) {
      delete object[name][key].$__path;
      items.push(object[name][key]);
    }
  }

  return items;
}
