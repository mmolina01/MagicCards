import React from 'react';
import {View, TouchableHighlight, Image, TextInput, Modal, Button} from 'react-native';
import Actions from '../actions/cardsAction.js';
import styles from './Styles.js';
const colorFilterValues = ['red', 'blue', 'green', 'white', 'black'];

class Menu extends React.Component{

	selectedFilter = '';

	constructor(props) {
		super(props);
		this.state = {
			cardName: '',
			showColorFilter: false
		}

		this._showColorFilters = this._showColorFilters.bind(this);
		this._hideColorFilters = this._hideColorFilters.bind(this);
		this._removeFilters = this._removeFilters.bind(this);
		this._selectColorFilter = this._selectColorFilter.bind(this);
		this._searchByCardName = this._searchByCardName.bind(this);
	}

	_removeFilters() {
		this.selectedFilter = null;
		Actions.filterCards({
			name: this.state.cardName,
			color: this.selectedFilter
		});
		this._hideColorFilters();
	}

	_showColorFilters() {
		this.setState(Object.assign(this.state, {showColorFilter: true}));
	}

	_hideColorFilters() {
		this.setState(Object.assign(this.state, {showColorFilter: false}));
	}

	_selectColorFilter(color) {
		this.selectedFilter = color;
		Actions.filterCards({
			name: this.state.cardName,
			color: color
		});
		this._hideColorFilters();
	}

	_searchByCardName() {
		Actions.filterCards({
			name: this.state.cardName,
			color: this.selectedFilter
		});
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