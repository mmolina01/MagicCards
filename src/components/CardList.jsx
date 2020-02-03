import React from 'react';
import {FlatList, View} from 'react-native';
import CardListItem from './CardListItem.jsx';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';

class CardList extends React.Component {
	constructor(props) {
		super(props);

		this._endReached = this._endReached.bind(this);
	}

	_endReached() {
		console.log('end');
		Actions.loadMoreCards();
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
				/>
			);
		}

		return <View />
	}
}

export default CardList;