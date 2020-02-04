import React from 'react';
import {View, ActivityIndicator, Modal, Text, SafeAreaView} from 'react-native';
import Menu from './src/components/Menu.jsx';
import CardList from './src/components/CardList.jsx';
import styles from './src/components/Styles.js';
import CardsStore from './src/stores/CardsStore.js';
import CardDetail from './src/components/CardDetail.jsx';
import fakeCards from './src/fake/fakeData.js';

export default class App extends React.Component {

	page = 1;
	pageSize = 30;
	cardInDetail = null;
	state = {
		loadingCards: false, //true,
		gettingNewCards: false,
		data: fakeCards.cards,//[],
		showingDetails: false
	};

	componentDidMount() {

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

		//CardsStore.init();
	}

	componentWillUnmount() {
		//remove event listeners (not needed for this app)
	}

	showDetails(card) {
		if (card) {
			this.cardInDetail = card;
			console.log(this.state.showingDetails);
			this.setState(Object.assign(this.state, {showingDetails: true}));
			console.log(this.state.showingDetails);
		}
	}

	closeDetails() {
		this.setState(Object.assign(this.state, {showingDetails: false}));
		console.log(this.state)
	}

	renderLoading() {
		return( //transform this into modal
			<ActivityIndicator />
		);
	}

	renderList() {

		const activity = this.state.gettingNewCards ? <ActivityIndicator /> : null;
		return(
			<View style={styles.container}>
				<Menu></Menu>

				<CardList cards={this.state.data} showLoader={this.state.gettingNewCards}></CardList>
				{/* {activity} */}

				{/* <Modal visible={false} animationType="slide" onRequestClose={()=>{}} style={styles.modalStyle}>
					<Text>inside modal {this.state.showingDetails? 'true' : 'false'}</Text>
					<CardDetail card={this.cardInDetail}></CardDetail>
				</Modal> */}
			</View>
		);
	}

	render() {

		// if (this.state.loadingCards) {
		// 	return(
		// 		<View style={styles.loader}>
		// 			<ActivityIndicator />
		// 		</View>
		// 	);
		// }

		const renderedItems = this.state.loadingCards ? this.renderLoading() : this.renderList();

		// const loadingIcon = this.state.gettingNewCards ? <ActivityIndicator style={styles.top20}/> : <View/>;
		// return (
		// 	<View style={styles.container}>
		// 		<Modal visible={false} animationType="slide" onRequestClose={()=>{}}>
		// 			<Text>inside modal {this.state.showingDetails? 'true' : 'false'}</Text>
		// 			<CardDetail card={this.cardInDetail}></CardDetail>
		// 		</Modal>

		// 		<CardList cards={this.state.data}></CardList>
		// 	</View>


			// <View style={styles.container}>
			// 	{/* <Menu></Menu> */}
			// 	<CardList cards={this.state.data} showLoader={true}></CardList>
			// </View>
		//);

		return(
			<SafeAreaView style={styles.container}>
				{renderedItems}
			</SafeAreaView>
		);
	}
}
