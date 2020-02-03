import React from 'react';
import {View, Text, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import ColorIcon from './ColorIcon.jsx';
import styles from './Styles';
import Actions from '../actions/cardsAction.js';

class CardDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showFullImage: false
		};
		this._closeDetail = this._closeDetail.bind(this);
		this._showFullImage = this._showFullImage.bind(this);
		this._hideFullImage = this._hideFullImage.bind(this);
	}

	_showFullImage() {
		this.setState({
			showFullImage: true
		});
	}

	_hideFullImage() {
		this.setState({
			showFullImage: false
		});
	}

	_closeDetail() {
		Actions.closeCardDetail();
	}

	render() {

		if (this.props.card) {
			if (this.state.showFullImage) {
				return(
					<View style={styles.fullScreenImageContainer} >
						<TouchableWithoutFeedback onPress={this._hideFullImage}>
							<View style={styles.closeBtn}>
								<Text>X</Text>
							</View>
						</TouchableWithoutFeedback>
						<Image resizeMode='contain' style={styles.fullScreenImage} source={{uri: this.props.card.imageUrl}} />
					</View>
				);
			}
	
			return(
				<ScrollView style={styles.cardDetailContainer}>
					<View style={styles.cardDetailView}>
						<TouchableWithoutFeedback onPress={this._closeDetail}>
							<View style={styles.closeBtn}>
								<Text>X</Text>
							</View>
						</TouchableWithoutFeedback>
	
						<TouchableWithoutFeedback onPress={this._showFullImage}>
							<Image style={styles.cardDetailImage} source={{uri: this.props.card.imageUrl}} />
						</TouchableWithoutFeedback>
	
						<Text style={[styles.itemTitle, {color: '#bcd1bc'}]}>{this.props.card.name}</Text>
						{this.props.card.colors.map((color) => {
							return(
								<ColorIcon key={color} colorName={color} ></ColorIcon>
							);
						})}
						<Text style={styles.itemSubtitle}>Type: {this.props.card.type}</Text>
						<Text style={styles.itemSubtitle}>Set: {this.props.card.set}</Text>
						<Text style={styles.itemSubtitle}>Set name: {this.props.card.setName}</Text>
						<Text style={styles.itemSubtitle}>Mana cost: {this.props.card.manaCost}</Text>
						<Text style={styles.itemSubtitle}>Rarity: {this.props.card.rarity}</Text>
						<Text style={styles.itemSubtitle}>Type: {this.props.card.type}</Text>
					</View>
				</ScrollView>
			);
		}

		return <Text>abc</Text>;
	}
}

export default CardDetail;