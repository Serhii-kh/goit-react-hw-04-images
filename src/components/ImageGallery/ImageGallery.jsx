import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'Api/fetchImages';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types'

let page = 1;
export class ImageGallery extends Component {
	state = {
		images: [],
		error: null,
		loading: false,
		totalHits: 0,
		hits: 0,
	};

	componentDidUpdate(prevProps) {
		const prevSearchQuery = prevProps.searchQuery;
		const nextSearchQuery = this.props.searchQuery;

		if (prevSearchQuery !== nextSearchQuery) {
			page = 1;
			this.setState({
				loading: true,
			})

			try {
				fetchImages(nextSearchQuery, page).then(({ hits, totalHits }) =>
					this.setState({
						images: hits,
						hits: hits.length,
						totalHits,
					})
				);
				page += 1;
			} catch (error) {
				this.setState({ error })
			}
			finally {
				this.setState({
					loading: false,
				})
			}
		}
	}

	handleLoadMoreBtnClick = () => {
		this.setState({
			loading: true,
		})

		try {
			fetchImages(this.props.searchQuery, page).then(({ hits }) =>
				this.setState(state => ({
					images: [...state.images, ...hits],
					hits: (state.hits + hits.length),
				}))
			);
			page += 1;
		} catch (error) {

		} finally {
			this.setState({
				loading: false,
			})
		}
	};

	render() {
		const { images, loading, hits, totalHits } = this.state;
		const imagesLength = this.state.images.length;

		return (
			<div className={css.listWrapper}>
				{loading && <Loader />}
				{imagesLength > 0 && (
					<>
						<ul className={css.ImageGallery}>
							{images.map((image) => (
								<ImageGalleryItem key={image.id} image={image}
								/>
							))}
						</ul>

						{hits < totalHits && <Button
							type="button"
							onClick={this.handleLoadMoreBtnClick}>
							Load more
						</Button>}
					</>
				)}
			</div>
		);
	}
}


ImageGallery.propTypes = {
	images: PropTypes.array,
	loading: PropTypes.bool,
	image: PropTypes.object,
	onClick: PropTypes.func,
	fetchImages: PropTypes.func,
}