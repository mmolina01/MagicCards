import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import ColorIcon from './ColorIcon.jsx'
import styles from './Styles.js';
import Actions from '../actions/cardsAction.js';


class CardListItem extends React.Component {

	constructor(props) {
		super(props);

		this._itemSelected = this._itemSelected.bind(this);
	}

	_itemSelected() {
		console.log(this.props.card);
		Actions.showCardDetail(this.props.card);
	}

	render() {
		return (

			<TouchableHighlight onPress={this._itemSelected} underlayColor="white">
				<View style={styles.listItem}>
					<View style={styles.listInfo}>
						<Text style={styles.itemTitle}>{this.props.card.name}</Text>
						{this.props.card.colors.map((color) => {
							return(
								<ColorIcon key={color} colorName={color} ></ColorIcon>
							);
						})}
						<Text style={styles.itemSubtitle}>Type: {this.props.card.type}</Text>
						<Text style={styles.itemSubtitle}>Set: {this.props.card.setName}</Text>
					</View>

					<View style={styles.listImage}>
						<Image style={styles.itemThumbnail} source={{uri:this.props.card.imageUrl}} />
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default CardListItem;