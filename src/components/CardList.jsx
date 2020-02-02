import React from 'react';
import {FlatList, Text} from 'react-native';
import CardListItem from './CardListItem.jsx';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';

class CardList extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.cards);
		this._endReached = this._endReached.bind(this);
	}

	_endReached() {
		console.log('end');
		//Actions.loadMoreCards();
	}

	render() {
		return(
			<FlatList
				data={this.props.cards}
				renderItem={({item}) => (
					<CardListItem card={item} />
				)}
				keyExtractor={({item, id}) => id}
				onEndReached={this._endReached}
				onEndReachedThreshold = { 0.1 }
				style={styles.cardList}
			/>
		);
	}
}

export default CardList;