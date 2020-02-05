import React from 'react';
import {View, TouchableHighlight, Image, TextInput, Modal, Button, Text} from 'react-native';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';

const colorFilterValues = ['red', 'blue', 'green', 'white', 'black'];

class Menu extends React.Component{

	//selectedFilter = null;

	constructor(props) {
		super(props);
		this.state = {
			cardName: '',
			showColorFilter: false,
			selectedFilter: ''
		}
		this.initialFilters = '';

		// + Binds
		this._cancelColorFilters = this._cancelColorFilters.bind(this);
		this._hideColorFilters = this._hideColorFilters.bind(this);
		this._showColorFilters = this._showColorFilters.bind(this);
		this._applyFilters = this._applyFilters.bind(this);
		this._searchByCardName = this._searchByCardName.bind(this);
		this._selectColorFilter = this._selectColorFilter.bind(this);
		// - Binds
	}

	/*
		Cancels the color filter screens, resetting the selected color filters to its initial state
	*/
	_cancelColorFilters() {
		this.setState({selectedFilter: this.initialFilters});
		this._hideColorFilters();
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
		this.initialFilters = this.state.selectedFilter;
		this.setState({showColorFilter: true});
	}

	/*
		Removes a selected color filter
		Calls the Action for Filtering cards
	*/
	_applyFilters() {

		Actions.filterCards({
			name: this.state.cardName,
			color: this.state.selectedFilter
		});
		this._hideColorFilters();
	}

	/*
		Calls the Action for filtering cards by name (and color filter if any selected)
	*/
	_searchByCardName() {
		Actions.filterCards({
			name: this.state.cardName,
			color: this.state.selectedFilter
		});
	}

	/*
		Adds/removes recieved color string to the selected filters
	*/
	_selectColorFilter(color) {

		let selectedFilter = '';

		if (this.state.selectedFilter.includes(color)) {
			const filters = this.state.selectedFilter.split(',').filter((c) => c !== color);
			for (let i = 0; i < filters.length; i++) {
				if (i > 0) {
					selectedFilter += ',' + filters[i];
				} else{
					selectedFilter += filters[i];
				}
			}
		} else{
			selectedFilter = this.state.selectedFilter ? this.state.selectedFilter += ',' + color: color;
		}

		this.setState({selectedFilter});
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
										this.state.selectedFilter.includes(colorName) ? 
										<Image source={require('../images/check.png')} style={styles.selectedFilterIcon}/> 
										: null
									}

								</View>
							);
						})}
						<Text style={styles.top20}>
							...
						</Text>
						<View style={[styles.filterButton, styles.top20]}>
							<Button title={'Apply filters'} color={'orange'} onPress={this._applyFilters}/>
						</View>
						<View style={styles.filterButton}>
							<Button title={'cancel'} color={'gray'} onPress={this._cancelColorFilters}/>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

}

export default Menu;