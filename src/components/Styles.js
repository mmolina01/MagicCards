import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');
const deviceWidth = window.width;
const deviceHeight = window.height;

const styles = StyleSheet.create({

	cardDetailImage: {
		width: 200,
		height: 300
	},

	cardDetailView: {
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		padding: 15,
		width: deviceWidth,
		height: deviceHeight,
	},

	cardList: {
		width: deviceWidth,
		height: deviceHeight
	},

	cardNameInput: {
		height: (0.2 *deviceHeight) < 25 ? (0.2 * deviceHeight - 5) : 25,
		color: '#44474f',
		backgroundColor: '#fff',
		width: 0.3 * deviceWidth,
		paddingLeft: 5
	},

	closeBtn: {
		width: 25,
		height: 25,
		backgroundColor: '#fff',
		borderRadius: 50,
		borderColor: '#000',
		position: 'absolute',
		top: 25,
		right: 5,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2
	},

	colorIcon: {
		width: 15,
		height: 15,
		borderRadius: 25,
		backgroundColor: 'black',
		borderColor: '#bcd1bc',
		borderWidth: 1
	},

	colorIconsContainer: {
		flexDirection: 'row'
	},

	container: {
		flex: 1,
		backgroundColor: '#e3e1dc',
		alignItems: 'center',
		justifyContent: 'center',
		width: deviceWidth,
		height: deviceHeight
	},

	detailImageMessage: {
		fontSize: 12,
		color: '#ccc',
		marginTop: 2
	},

	detailSubtitle: {
		fontSize: 18,
		color: '#fff',
		marginTop: 10
	},

	detailTitle: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#bcd1bc',
		marginTop: 20,
		marginBottom: 10
	},

	filterImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		margin: 'auto'
	},

	filterBtnContainer: {
		height: (0.1 *deviceHeight) < 25 ? (0.2 * deviceHeight - 5) : 25,
		width: (0.1 *deviceHeight) < 25 ? (0.2 * deviceHeight - 5) : 25,
		backgroundColor: '#0373fc',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		margin: 'auto',
		padding: 1
	},

	filterButton: {
		margin: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	fullScreenImage: {
		width: deviceWidth * 0.9,
		height: deviceHeight * 0.9,
		margin: 'auto'
	},

	fullScreenImageContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
		position: 'relative',
		width: deviceWidth,
		height: deviceHeight
	},

	innerModalContainer: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e3e1dc'
	},

	itemSubtitle: {
		fontSize: 16,
		color: '#44474f'
	},

	itemThumbnail: {
		width: 50,
		height: 50
	},
	
	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000'
	},

	listImage: {
		flex: 0.15
	},

	listInfo: {
		flex: 0.85
	},

	listItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		padding: 5,
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	loader: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},

	menu: {
		height: 45,
		width: deviceWidth,
		padding: 10,
		backgroundColor: '#376db3',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},

	modalStyle: {
		backgroundColor: '#e3e1dc',
		height: deviceHeight,
		width: deviceWidth,
		alignItems: 'center',
		justifyContent: 'center'
	},

	moreCardsLoader: {
		height: 20
	},

	searchContainer: {
		justifyContent: 'center',
		flexDirection: 'row'
	},

	selectedFilterIcon: {
		height: 20,
		width: 20
	},

	top20: {
		marginTop: 20
	}

});

export default styles;