import distpatcher from '../Dispatcher.js';

export default {
	loadMoreCards: () => {
		distpatcher.dispatch({
			type: 'LOAD_MORE_CARDS'
		});
	},

	filterCards: (filter) => {
		distpatcher.dispatch({
			type: 'FILTER_CARDS',
			filter
		});
	},

	showCardDetail: (card) => {
		distpatcher.dispatch({
			type: 'SHOW_CARD_DETAIL',
			card
		});
	},

	closeCardDetail: () => {
		distpatcher.dispatch({
			type: 'CLOSE_CARD_DETAIL'
		});
	}
};