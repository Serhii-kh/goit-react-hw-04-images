import { useState} from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import PropTypes from 'prop-types'

export const App = () => {
	const [searchQuery, setSearchquery] = useState('')

	const onSubmit = (searchQuery) => {
		setSearchquery(searchQuery)
	};

		return (
			<div className={css.App}>
				<Searchbar handlerFormSubmit={onSubmit} />
				<ImageGallery searchQuery={searchQuery} />
			</div>
		);
}


App.propTypes = {
	handleSubmit: PropTypes.func,
	searchQuery: PropTypes.string,
}