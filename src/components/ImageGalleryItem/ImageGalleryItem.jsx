import { useState } from 'react'
import { Modal } from 'components/Modal/Modal'
import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({ image }) => {
	const [showModal, setShowModal] = useState(false)

	const { tags, webformatURL, largeImageURL } = image

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<>
			<li className={css.ImageGalleryItem}>
				<img className={css.ImageGalleryItem__image}
					src={webformatURL}
					alt={tags}
					onClick={toggleModal}
				/>
			</li>
			{showModal && <Modal onClose={toggleModal}>
				<img src={largeImageURL} alt={tags} />
			</Modal>}
		</>
	)
}


ImageGalleryItem.propTypes = {
	showModal: PropTypes.bool,
	src: PropTypes.string,
	alt: PropTypes.string,
	onClick: PropTypes.func,
	image: PropTypes.object.isRequired,
}