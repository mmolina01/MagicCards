import React from 'react';
import {View, ActivityIndicator, Modal, Text, SafeAreaView} from 'react-native';
import Menu from './src/components/Menu.jsx';
import CardList from './src/components/CardList.jsx';
import styles from './src/components/Styles.js';
import CardsStore from './src/stores/CardsStore.js';
import CardDetail from './src/components/CardDetail.jsx';
//import fakeCards from './src/fake/fakeData.js';

export default class App extends React.Component {

	//
	cardInDetail = null;
	state = {
		loadingCards: true,
		gettingNewCards: false,
		data: [],
		showingDetails: false
	};

	componentDidMount() {

		CardsStore.on('CARDS_LOADED', (data) => {
			this.setState({data});
		});

		CardsStore.on('LOADING_STATE', (loadingCards) => {
			this.setState({loadingCards});
		});

		CardsStore.on('LOADING_MORE_STATE', (gettingNewCards) => {
			this.setState({gettingNewCards});
		});
		
		CardsStore.on('SHOW_DETAILS', (card) => {
			this.showDetails(card);
		});

		CardsStore.on('CLOSE_DETAILS', () => {
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
			this.setState({showingDetails: true});
		}
	}

	closeDetails() {
		this.setState({showingDetails: false});
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
							<CardDetail card={this.cardInDetail}></CardDetail>
						</View>
					</Modal>
				</View>
			</SafeAreaView>
		);
	}
}
