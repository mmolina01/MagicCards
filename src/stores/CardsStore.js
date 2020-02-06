import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

const pageSize = 30;

class CardsStore extends EventEmitter {
	page = 1;
	filters = {};
	loading = false;
	loadingMore = false;
	noCardsFound = false;

	constructor() {
		super();
		this.cards = [];
	}

	/*
		Initializes the store by fetching cards data
	*/
	init() {
		this.renewCards();
	}

	/*
		Emits the cards array when new cards are added to it or is refreshed
	*/
	emitNewCards() {
		this.emit('CARDS_LOADED', this.cards);
	}

	/*
		Emits when fetching cards for refreshing the cards array
	*/
	emitLoadingState() {
		this.emit('LOADING_STATE', this.loading);
	}

	/*
		Emits when fetching for adding cards to the cards array
	*/
	emitLoadingMoreState() {
		this.emit('LOADING_MORE_STATE', this.loadingMore);
	}

	/*
		Overwrites the cards array with a new one 
	*/
	async renewCards() {
		this.loading = true;
		this.emitLoadingState();

		this.noCardsFound = false;
		this.cards = await this.getCards();
		this.emitNewCards();

		this.loading = false;
		this.emitLoadingState();
	}

	/*
		Fetch cards from the api 
	*/
	async getCards() {

		let filterString = '';
		filterString += (this.filters && this.filters.color ? '&colors='+this.filters.color : '');
		filterString += (this.filters && this.filters.name ? '&name='+this.filters.name : '');

		return fetch('https://api.magicthegathering.io/v1/cards?page=' + this.page +
		'&pageSize=' + pageSize +'&contains=imageUrl' + filterString)
		.then((response) => response.json())
		.then((responseJson) => {

			//API isn't 100% accurate with "contains=imageUrl", this filter removes cards without images
			const cards = responseJson.cards.filter((card) => card.imageUrl);

			this.noCardsFound = (cards.length === 0);

			return cards;
		})
		.catch((error) =>{
			console.error(error);
			return null;
		});
	}

	/*
		Fetch for a next page of cards 
	*/
	async getNextPage() {

		if (!this.loadingMore && !this.noCardsFound) {
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
	}

	/*
		Applies filters to be used by the fetch card method 
	*/
	applyFilters(filter) {
		this.filters = filter;
		this.page = 1;
		this.renewCards();
	}

	/*
		Handles actions recieved from the distpatcher 
	*/
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
	}
}

const cardStore = new CardsStore();
dispatcher.register(cardStore.handleAction.bind(cardStore));

export default cardStore;