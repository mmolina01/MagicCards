import React from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import CardListItem from './CardListItem.jsx';
import Actions from '../actions/cardsAction.js';
import CardsStore from '../stores/CardsStore.js';
import styles from './Styles.js';

class CardList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false
		};

		this._endReached = this._endReached.bind(this);
		this._renderLoader = this._renderLoader.bind(this);
	}

	componentDidMount() {

		CardsStore.on('LOADING_MORE_STATE', (showLoader) => {
			if(showLoader)
			this.setState(Object.assign(this.state, {showLoader}));
			console.log(this.state);
		});
	}

	componentWillUnmount() {
		//remove events
	}

	_endReached() {
		console.log('end');
		Actions.loadMoreCards();
	}

	_renderLoader() {
		return this.props.showLoader ? <ActivityIndicator/> : null;
	}

	render() {

		if (this.props.cards && this.props.cards.length > 0) {
			return(
				<FlatList
					style={styles.cardList}
					data={this.props.cards}
					onEndReachedThreshold = { 0.1 }
					onEndReached={this._endReached}
					renderItem={({item}) => (
						<CardListItem card={item} />
					)}
					keyExtractor={({item, id}) => id}
					ListFooterComponent={this._renderLoader}
				/>
			);
		}

		return <View />
	}
}

export default CardList;