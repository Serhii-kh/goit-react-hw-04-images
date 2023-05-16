import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import PropTypes from 'prop-types'


export class App extends Component {
	state = {
		searchQuery: '',
	};

	onSubmit = (searchQuery) => {
		this.setState({
			searchQuery,
		});
	};

	render() {
		const { searchQuery } = this.state;

		return (
			<div className={css.App}>
				<Searchbar handleSubmit={this.onSubmit} />
				<ImageGallery searchQuery={searchQuery} />
			</div>
		);
	}
}


App.propTypes = {
	handleSubmit: PropTypes.func,
	searchQuery: PropTypes.string,
}