import { useState } from 'react';
import { Button } from 'components/Button/Button';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types'


export const Searchbar = ({ handlerFormSubmit }) => {
	const [searchQuery, setSearchquery] = useState('')

	const handleChange = e => {
		const { value} = e.target;

		setSearchquery(value)
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (searchQuery.trim() === '') {
			alert('Please enter your search query');
			return;
		}

		handlerFormSubmit(searchQuery);
	};

	return (
		<header className={css.Searchbar}>
			<form className={css.SearchForm} onSubmit={handleSubmit}>
				<Button type="submit">
					<span className={css.SearchForm__button__label}>Search</span>
				</Button>

				<input
					className={css.SearchForm__input}
					value={searchQuery}
					onChange={handleChange}
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
					name="searchQuery"
				/>
			</form>
		</header>
	);
}



Searchbar.propTypes = {
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,

}