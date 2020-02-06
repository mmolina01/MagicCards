import React from 'react';
import {FlatList, View, ActivityIndicator, Text} from 'react-native';
import CardListItem from './CardListItem.jsx';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';

class CardList extends React.Component {

	constructor(props) {
		super(props);

		// + Binds
		this._endReached = this._endReached.bind(this);
		this._renderLoader = this._renderLoader.bind(this);
		// - Binds
	}

	/*
		Triggered when the list hits its bottom (onEndReachedThreshold)
		Emits event to the store to load more cards
	*/
	_endReached() {
		Actions.loadMoreCards();
	}

	/*
		Renders the loading icon at the list footer when needed
	*/
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
		} else if (this.props.cards && this.props.cards.length === 0) {
			<View style={styles.cardList}>
				<Text>No cards found</Text>
			</View>
		}

		return (
			<View style={styles.noCardsFound}>
				<Text>No cards found</Text>
			</View>
		);
	}
}

export default CardList;