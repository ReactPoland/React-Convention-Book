import mapHelpers from '../utils/mapHelpers';


  // [MENUITEM_LIST]: (state, payload) => {
  //   const newItems = payload.map((menuItem) => {
  //     return new MenuItem(menuItem);
  //   });

  //   return mapHelpers.addMultipleItems(state, newItems);
  // },

  // [MENUITEM_ADD]: (state, payload) => {
  //   let newMenuItem = new MenuItem(payload);
  //   return mapHelpers.addItem(state, payload.id, newMenuItem);
  // },

const article = (state = {}, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
      alert(1);
			return Object.assign({}, state);
		case 'ARTICLES_LIST_ADD':
			let articlesList = action.payload.response;
      console.info('--------');
      console.info('---state-----');
      console.info(state);
      console.info('---state-----');
      console.info('--------');
      console.info('--------');
      // at this point the articlesList is an object, we need transform it into array
      articlesList = Object.keys(articlesList).map((itemIndex) => {
        return articlesList[itemIndex];
      });

			return mapHelpers.addMultipleItems(state, articlesList);
		case 'PUSH_NEW_ARTICLE':
			let newArticleObject = action.payload.response;
			alert('pushed id = '+JSON.stringify(newArticleObject));
			alert(JSON.stringify(state));
			return Object.assign({}, articlesList);
		default:
			return state;
	}
}

export default article