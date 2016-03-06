const articleMock = {
	"987654": {
		articleTitle: "Lorem ipsum - article one",
		articleContent: "Here goes the content of the article"
	},
	"123456": {
		articleTitle: "Lorem ipsum - article two",
		articleContent: "Sky is the limit, the content goes here."
	}
};

const article = (state = articleMock, action) => {
	switch (action.type) {
		case 'RETURN_ALL_ARTICLES':
			return new Object.assign({}, state);
		default:
			return new Object.assign({}, {error: "action type hasn't been provided"});
	}
}

export default article