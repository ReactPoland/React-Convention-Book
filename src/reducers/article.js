const article = (state = {}, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
			return Object.assign({}, state);
		case 'ARTICLES_LIST_ADD':
			let articlesList = action.payload.response;
			return Object.assign({}, articlesList);
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