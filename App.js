import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Menu from './src/components/Menu.jsx';
import CardList from './src/components/CardList.jsx';
import styles from './src/components/Styles.js';
import CardsStore from './src/stores/CardsStore.js';
import CardDetail from './src/components/CardDetail.jsx'

export default class App extends React.Component {

	state = {
		loadingCards: true,
		gettingNewCards: false,
		data: [],
		showingDetails: false
	};
	page = 1;
	pageSize = 30;
	cardInDetail = null;

	componentDidMount() {console.log('mount')

		CardsStore.on('CARDS_LOADED', (data) => {
			this.setState(Object.assign(this.state, {data}));
		});

		CardsStore.on('LOADING_STATE', (loadingCards) => {
			this.setState(Object.assign(this.state, {loadingCards}));
		});

		CardsStore.on('LOADING_MORE_STATE', (gettingNewCards) => {
			this.setState(Object.assign(this.state, {gettingNewCards}));
		});
		
		CardsStore.on('SHOW_DETAILS', (card) => {
			this.showDetails(card);
		});

		CardsStore.on('CLOSE_DETAILS', (card) => {
			this.closeDetails();
		});

		CardsStore.init();
	}

	componentWillUnmount() {
		//remove event listeners (not needed for this app)
	}

	showDetails(card) {
		if (card) {
			this.cardInDetail = card;
			this.setState(Object.assign(this.state, {showingDetails: true}));
		}
	}

	closeDetails() {
		this.setState(Object.assign(this.state, {showingDetails: false}));
	}

	render() {

		if (this.state.loadingCards) {
			return(
				<View style={styles.loader}>
					<ActivityIndicator />
				</View>
			);
		}

		if (this.state.showingDetails) {
			return (
				<CardDetail card={this.cardInDetail}></CardDetail>
			);
		}

		const loadingIcon =  this.state.gettingNewCards ? <ActivityIndicator style={styles.top20}/> : <View/>;
		return (
			<View style={styles.container}>
				<Menu></Menu>
				<CardList cards={this.state.data}></CardList>
				{loadingIcon}
			</View>
		);
	}
}
