import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');
const deviceWidth = window.width;
const deviceHeight = window.height;

const styles = StyleSheet.create({

	top20: {
		marginTop: 20
	},

	container: {
		flex: 1,
		backgroundColor: '#e3e1dc',
		alignItems: 'center',
		justifyContent: 'center',
		width: deviceWidth,
		height: deviceHeight
	},

	loader: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},

	menu: {
		height: 0.1 * deviceHeight,
		width: deviceWidth,
		padding: 10,
		backgroundColor: '#376db3',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},

	filterButton: {
		margin: 5,
		color: 'pink'
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

	filterImage: {
		flex: 1,
		width: '100%',
		height: '100%'
	},

	searchContainer: {
		margin: 'auto',
		flexDirection: 'row'
	},

	cardNameInput: {
		height: (0.2 *deviceHeight) < 25 ? (0.2 * deviceHeight - 5) : 25,
		color: '#44474f',
		backgroundColor: '#fff',
		width: 0.3 * deviceWidth,
		paddingLeft: 5
	},

	searchArea: {

	},

	cardList: {
		width: deviceWidth,
		height: deviceHeight
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

	listInfo: {
		flex: 0.85
	},

	listImage: {
		flex: 0.15
	},

	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000'
	},

	itemSubtitle: {
		fontSize: 16,
		color: '#44474f'
	},

	itemThumbnail: {
		width: 50,
		height: 50
	},

	moreCardsLoader: {
		height: 20
	},

	colorIconsContainer: {
		flexDirection: 'row'
	},

	colorIcon: {
		width: 15,
		height: 15,
		borderRadius: 25,
		backgroundColor: 'black',
		borderColor: '#bcd1bc',
		borderWidth: 1
	},

	cardDetailContainer: {
		flex: 1,
		backgroundColor: '#000',
		width: '100%',
		height: '100%'
	},

	cardDetailView: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative', //TODO
		padding: 15,
	},

	cardDetailImage: {
		width: 200,
		height: 300,
		flex: 1,
		marginTop: 50,
	},

	closeBtn: {
		width: 25,
		height: 25,
		backgroundColor: '#fff',
		borderRadius: 50,
		position: 'absolute',
		top: 5,
		right: 5,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2
	},

	fullScreenImageContainer: {
		marginTop: 10,
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#000',
		position: 'relative'
	},

	fullScreenImage: {
		flex: 1,
		width: deviceWidth * 0.9,
		height: deviceHeight * 0.9
	},

	modalStyle: {
		width: deviceWidth,
		height: deviceHeight,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default styles;