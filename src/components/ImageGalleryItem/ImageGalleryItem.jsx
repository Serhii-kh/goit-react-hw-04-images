import { Component } from 'react'
import { Modal } from 'components/Modal/Modal'
import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

export class ImageGalleryItem extends Component {
	state = {
		showModal: false,
	}

	toggleModal = () => {
		this.setState(({ showModal }) => ({
			showModal: !showModal,
		}))
	}

	render() {
		const { showModal } = this.state
		const { image } = this.props
		const { tags, webformatURL, largeImageURL } = image

		return (
			<>
				<li className={css.ImageGalleryItem}>
					<img className={css.ImageGalleryItem__image}
						src={webformatURL}
						alt={tags}
						onClick={this.toggleModal}
					/>
				</li>
				{showModal && <Modal onClose={this.toggleModal}>
					<img src={largeImageURL} alt={tags} />
				</Modal>}
			</>
		)
	}
}

ImageGalleryItem.propTypes = {
	showModal: PropTypes.bool,
	src: PropTypes.string,
	alt: PropTypes.string,
	onClick: PropTypes.func,
}