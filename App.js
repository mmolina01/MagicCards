import React from 'react';
import {View, ActivityIndicator, Modal, Text, SafeAreaView} from 'react-native';
import Menu from './src/components/Menu.jsx';
import CardList from './src/components/CardList.jsx';
import styles from './src/components/Styles.js';
import CardsStore from './src/stores/CardsStore.js';
import CardDetail from './src/components/CardDetail.jsx';
//import fakeCards from './src/fake/fakeData.js';

export default class App extends React.Component {

	state = {
		loadingCards: true,
		gettingNewCards: false,
		data: [],
		showingDetails: false,
		cardInDetail: null
	};

	/*
		Starts listeners for all events needed
		Calls the CardStore for start loading the cards
	*/
	componentDidMount() {

		// + Binds
		this._activateLoading = this._activateLoading.bind(this);
		this._activateLoadingMore = this._activateLoadingMore.bind(this);
		this._cardsLoaded = this._cardsLoaded.bind(this);
		this._closeDetails = this._closeDetails.bind(this);
		this._showDetails = this._showDetails.bind(this);
		// - Binds

		// + Add event listeners
		CardsStore.on('CARDS_LOADED', this._cardsLoaded);
		CardsStore.on('LOADING_STATE', this._activateLoading);
		CardsStore.on('LOADING_MORE_STATE', this._activateLoadingMore);
		CardsStore.on('SHOW_DETAILS', this._showDetails);
		CardsStore.on('CLOSE_DETAILS', this._closeDetails);
		// - Add event listeners

		CardsStore.init();
	}

	/*
		Removes all listeners before unmointing the component
	*/
	componentWillUnmount() {

		// + Remove event listeners
		CardsStore.removeListener('CARDS_LOADED', this._cardsLoaded);
		CardsStore.removeListener('LOADING_STATE', this._activateLoading);
		CardsStore.removeListener('LOADING_MORE_STATE', this._activateLoadingMore);
		CardsStore.removeListener('SHOW_DETAILS', this._showDetails);
		CardsStore.removeListener('CLOSE_DETAILS', this._closeDetails);
		// - Remove event listeners
	}

	/*
		Turns visible the loading modal, covering all the screen to prevent user input while loading cards
	*/
	_activateLoading(loadingCards) {
		/* When the petitions (API) are too fast (usually when no cards found)
			the modal doesn't have time to show/hide between them and gets stucks sometimes,
			the delay avoids that
		*/
		const t = loadingCards ? 0 : 600;
		setTimeout(() => {
			this.setState({loadingCards});
		}, t);
	}

	/*
		Sets to true gettingNewCards, passed as prop to the list for showing the loading indicator at its footer
	*/
	_activateLoadingMore(gettingNewCards) {
		this.setState({gettingNewCards});
	}

	/*
		Updates the data object for re-rendering the cards list
	*/
	_cardsLoaded(data) {
		this.setState({data});
	}

	/*
		Turns invisible the card detail Modal
	*/
	_closeDetails() {
		this.setState({showingDetails: false});
	}

	/*
		Turns visible the card detail Modal
	*/
	_showDetails(card) {
		if (card) {
			this.setState({showingDetails: true, cardInDetail: card});
		}
	}

	render() {

		return(
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<Modal visible={this.state.loadingCards} style={styles.modalStyle}>
						<View style={styles.innerModalContainer}>
							<ActivityIndicator />
							<Text></Text>
						</View>
					</Modal>
					<Menu></Menu>

					<CardList cards={this.state.data} showLoader={this.state.gettingNewCards}></CardList>
					<Modal visible={this.state.showingDetails} animationType="slide" style={styles.modalStyle}>
						<View style={styles.innerModalContainer}>
							<CardDetail card={this.state.cardInDetail}></CardDetail>
						</View>
					</Modal>
				</View>
			</SafeAreaView>
		);
	}
}
