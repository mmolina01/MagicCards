import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';


class CardsStore extends EventEmitter {
	page = 1;
	pageSize = 15;
	filters = {};
	loading = false;
	loadingMore = false;

	constructor() {
		super();
		this.cards = [];
	}

	async init() {
		this.loading = true;
		this.emitLoadingState();

		this.cards = await this.getCards();
		this.emitNewCards();

		this.loading = false;
		this.emitLoadingState();

		setTimeout(() => {
			this.getNextPage();
		}, 3000);
	}

	setPage(page) {
		this.page = page;
	}

	setPage(size) {
		this.pageSize = size;
	}

	emitNewCards() {
		this.emit('CARDS_LOADED', this.cards);
	}

	emitLoadingState() {
		this.emit('LOADING_STATE', this.loading);
	}

	emitLoadingMoreState() {
		this.emit('LOADING_MORE_STATE', this.loadingMore);
	}

	getCards() {

		let filterString = '';
		filterString += (this.filters && this.filters.color ? '&color='+filters.color : '');
		filterString += (this.filters && this.filters.name ? '&name='+filters.name : '');

		return fetch('https://api.magicthegathering.io/v1/cards?page=' + this.page +
		'&pageSize=' + this.pageSize +'&contains=imageUrl' + filterString)
		.then((response) => response.json())
		.then((responseJson) => {

			//API isn't 100% accurate with "contains=imageUrl", this filter removes cards without images
			const cards = responseJson.cards.filter((card) => card.imageUrl);

			return cards;
		})
		.catch((error) =>{
			console.error(error);
			return null;
		});
	}

	async getNextPage() {
		this.loadingMore = true;
		this.emitLoadingMoreState();

		this.page++;
		const newCards = await this.getCards();
		if (newCards) {
			this.cards = this.cards.concat(newCards);
		}

		this.loadingMore = false;
		this.emitLoadingMoreState();

		this.emitNewCards();
	}

	async applyFilters(filter) {
		this.filters = filter;
		this.setPage(1);
		this.cards = await this.getCards();
		this.emitNewCards();
	}

	handleAction(action) {
		switch(action.type) {
			case 'LOAD_MORE_CARDS':
				this.getNextPage();
				break;
			case 'FILTER_CARDS':
				this.applyFilters(action.filter);
				break;
			case 'SHOW_CARD_DETAIL':
				this.emit('SHOW_DETAILS', action.card);
				break;
			case 'CLOSE_CARD_DETAIL':
				this.emit('CLOSE_DETAILS');
		}
		console.log('handle ation ' + action.type)
	}
}

const cardStore = new CardsStore();
dispatcher.register(cardStore.handleAction.bind(cardStore));

export default cardStore;