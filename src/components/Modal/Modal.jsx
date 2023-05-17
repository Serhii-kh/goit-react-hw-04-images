import { useEffect } from 'react'
import css from './Modal.module.css'
import PropTypes from 'prop-types'

export const Modal = ({ onClose, children }) => {


	const HandleOverlayClose = e => {
		if (e.currentTarget === e.target) onClose();
	}

	useEffect(() => {
		const onEscapeKeyPress = e => {
			if (e.code === 'Escape') onClose()
		}

		window.addEventListener('keydown', onEscapeKeyPress)

		return () => {
			window.removeEventListener('keydown', onEscapeKeyPress)
		}
	}, [onClose])

	return (
		<div className={css.Overlay} onClick={HandleOverlayClose}>
			<div className={css.Modal}>
				{children}
			</div>
		</div>
	)

}


Modal.propTypes = {
	onClick: PropTypes.func,
	onClose: PropTypes.func,
}