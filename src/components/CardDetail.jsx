import React from 'react';
import {View, Text, Modal, Image, TouchableWithoutFeedback} from 'react-native';
import ColorIcon from './ColorIcon.jsx';
import styles from './Styles';
import Actions from '../actions/cardsAction.js';

class CardDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showFullImage: false
		};

		// + Binds
		this._closeDetail = this._closeDetail.bind(this);
		this._showFullImage = this._showFullImage.bind(this);
		this._hideFullImage = this._hideFullImage.bind(this);
		// - Binds
	}

	/*
		Shows the full screen image Modal
	*/
	_showFullImage() {
		this.setState({
			showFullImage: true
		});
	}

	/*
		Hides the full screen image Modal
	*/
	_hideFullImage() {
		this.setState({
			showFullImage: false
		});
	}

	/*
		Ask Actions to emit the close card details event
	*/
	_closeDetail() {
		Actions.closeCardDetail();
	}

	render() {

		if (this.props.card) {

			return(
					<View style={styles.cardDetailView}>
						<TouchableWithoutFeedback onPress={this._closeDetail}>
							<View style={styles.closeBtn}>
								<Text>X</Text>
							</View>
						</TouchableWithoutFeedback>
	
						<TouchableWithoutFeedback onPress={this._showFullImage}>
							<Image style={styles.cardDetailImage} source={{uri: this.props.card.imageUrl}} />
						</TouchableWithoutFeedback>
						<Text style={styles.detailImageMessage}>
							Touch image to view full screen
						</Text>
	
						<Text style={styles.detailTitle}>{this.props.card.name}</Text>
						{this.props.card.colors.map((color) => {
							return(
								<ColorIcon key={color} colorName={color} ></ColorIcon>
							);
						})}
						<Text style={styles.detailSubtitle}>Type: {this.props.card.type}</Text>
						<Text style={styles.detailSubtitle}>Set: {this.props.card.set}</Text>
						<Text style={styles.detailSubtitle}>Set name: {this.props.card.setName}</Text>
						<Text style={styles.detailSubtitle}>Mana cost: {this.props.card.manaCost}</Text>
						<Text style={styles.detailSubtitle}>Rarity: {this.props.card.rarity}</Text>
						<Text style={styles.detailSubtitle}>Type: {this.props.card.type}</Text>

						<Modal visible={this.state.showFullImage} >
							<View style={styles.fullScreenImageContainer} >
								<TouchableWithoutFeedback onPress={this._hideFullImage}>
									<View style={styles.closeBtn}>
										<Text>X</Text>
									</View>
								</TouchableWithoutFeedback>
								<Image resizeMode='contain' style={styles.fullScreenImage} source={{uri: this.props.card.imageUrl}} />
							</View>
						</Modal>
					</View>
			);
		}

		return(
			<View style={styles.cardDetailView}>
				<Text style={styles.detailSubtitle}>
					No card data available
				</Text>
			</View>
		);
	}
}

export default CardDetail;