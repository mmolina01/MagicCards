import React from 'react';
import {View} from 'react-native';
import styles from './Styles.js';

class ColorIcon extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View style={[styles.colorIcon, {backgroundColor: this.props.colorName.toLowerCase()}]}>
			</View>
		);
	}
}

export default ColorIcon;