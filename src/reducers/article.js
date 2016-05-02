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
			return Object.assign({}, state);
		case 'ARTICLES_LIST_ADD':
			let articlesList = action.payload.response;
      console.info('articlesList');
      console.info(articlesList);
      // const articlesMap = articlesList.map((articleItem) => {
      //   return new Map(articleItem);
      // });


			return mapHelpers.addMultipleItems(state, articlesList);
			// return Object.assign({}, articlesList);
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