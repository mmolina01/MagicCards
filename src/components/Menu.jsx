import React from 'react';
import {View, TouchableHighlight, Image, TextInput, Modal, Button} from 'react-native';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';

const colorFilterValues = ['red', 'blue', 'green', 'white', 'black'];

class Menu extends React.Component{

	selectedFilter = null;

	constructor(props) {
		super(props);
		this.state = {
			cardName: '',
			showColorFilter: false
		}

		// + Binds
		this._hideColorFilters = this._hideColorFilters.bind(this);
		this._showColorFilters = this._showColorFilters.bind(this);
		this._removeFilters = this._removeFilters.bind(this);
		this._searchByCardName = this._searchByCardName.bind(this);
		this._selectColorFilter = this._selectColorFilter.bind(this);
		// - Binds
	}

	/*
		Turns invisible the color filters Modal
	*/
	_hideColorFilters() {
		this.setState({showColorFilter: false});
	}

	/*
		Turns visible the color filters Modal
	*/
	_showColorFilters() {
		this.setState({showColorFilter: true});
	}

	/*
		Removes a selected color filter
		Calls the Action for Filtering cards
	*/
	_removeFilters() {

		if (this.selectedFilter) {
			this.selectedFilter = null;
			Actions.filterCards({
				name: this.state.cardName,
				color: this.selectedFilter
			});
		}
		this._hideColorFilters();
	}

	/*
		Calls the Action for filtering cards by name (and color filter if any selected)
	*/
	_searchByCardName() {
		Actions.filterCards({
			name: this.state.cardName,
			color: this.selectedFilter
		});
	}

	/*
		Assings recieved color string to the selected filter
		Calls the Action for filtering cards by color (and name if any in input)
	*/
	_selectColorFilter(color) {
		this.selectedFilter = color;
		Actions.filterCards({
			name: this.state.cardName,
			color: color
		});
		this._hideColorFilters();
	}

	render() {
		return(
			<View>
				<View style={styles.menu}>
					<TouchableHighlight onPress={this._showColorFilters} underlayColor="#ccc" style={styles.filterBtnContainer}>
						<Image style={styles.filterImage} source={require('../images/filter.png')} />
					</TouchableHighlight>

					<View style={styles.searchContainer}>
						<TextInput
							style={styles.cardNameInput}
							placeholder="Write card name"
							onChangeText={(cardName) => this.setState({cardName})}
							value={this.state.cardName}
							onSubmitEditing={this._searchByCardName}
						/>

						<TouchableHighlight onPress={this._searchByCardName} underlayColor="#ccc"
						style={[styles.filterBtnContainer, {backgroundColor: '#F9D334', marginLeft: 10}]}>
							<Image style={styles.filterImage} source={require('../images/search.png')} />
						</TouchableHighlight>
					</View>
				</View>

				<Modal 
				visible={this.state.showColorFilter} style={styles.modalStyle} animationType={'slide'}>
					<View style={styles.innerModalContainer}>
						{colorFilterValues.map((colorName, $index) => {
							return(
								<View key={$index} style={styles.filterButton}>
									<Button title={colorName} color={colorName.toLowerCase()} 
									onPress={() => this._selectColorFilter(colorName)} />
									{
										colorName == this.selectedFilter ? 
										<Image source={require('../images/check.png')} style={styles.selectedFilterIcon}/> 
										: null
									}

								</View>
							);
						})}
						<View style={[styles.filterButton, styles.top20]}>
							<Button title={'remove filters'} color={'orange'} onPress={this._removeFilters}/>
						</View>
						<View style={styles.filterButton}>
							<Button title={'cancel'} color={'gray'} onPress={this._hideColorFilters}/>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

}

export default Menu;