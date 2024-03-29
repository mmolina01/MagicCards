import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import ColorIcon from './ColorIcon.jsx'
import styles from './Styles.js';
import Actions from '../actions/cardsAction.js';


class CardListItem extends React.Component {

	constructor(props) {
		super(props);

		// Binds
		this._itemSelected = this._itemSelected.bind(this);
	}

	/*
		Ask Actions to trigger the card selected event passing the card info
	*/
	_itemSelected() {
		Actions.showCardDetail(this.props.card);
	}

	render() {
		return (
			<TouchableHighlight onPress={this._itemSelected} underlayColor="#fff">
				<View style={styles.listItem}>
					<View style={styles.listInfo}>
						<Text style={styles.itemTitle}>{this.props.card.name}</Text>
						<View style={styles.colorIconsContainer}>
							{this.props.card.colors.map((color) => {
								return(
									<ColorIcon key={color} colorName={color} ></ColorIcon>
								);
							})}
						</View>
						<Text style={styles.itemSubtitle}>Type: {this.props.card.type}</Text>
						<Text style={styles.itemSubtitle}>Set: {this.props.card.setName}</Text>
					</View>

					<View style={styles.listImage}>
						<Image style={styles.itemThumbnail} source={{uri:this.props.card.imageUrl}} defaultSource={require('../images/noCard.jpg')}/>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default CardListItem;