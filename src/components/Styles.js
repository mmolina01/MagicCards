import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

	top20: {
		marginTop: 20
	},

	container: {
		flex: 1,
		backgroundColor: '#e3e1dc',
		alignItems: 'center',
		justifyContent: 'center'
	},

	loader: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},

	menu: {
		height: 100,
		width: '100%',
		paddingTop: 15,
		backgroundColor: '#376db3',
	},

	cardList: {
		width: '100%'
	},

	listItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		padding: 5,
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},

	listInfo: {
		flex: 0.75
	},

	listImage: {
		flex: 0.25
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
	},

	cardDetailView: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		marginBottom: 10,
		padding: 10,
		marginTop: 20,
	},

	cardDetailImage: {
		width: 300,
		height: 500,
		flex: 1,
		marginTop: 50,
	},

	closeBtn: {
		width: 50,
		height: 50,
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
		alignItems: 'center',
		backgroundColor: '#000',
		position: 'relative'
	},

	fullScreenImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	}
});

export default styles;