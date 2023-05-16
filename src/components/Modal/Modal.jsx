import { Component } from 'react'
import css from './Modal.module.css'
import PropTypes from 'prop-types'

export class Modal extends Component {
	
	componentDidMount() {
		window.addEventListener('keydown', this.onEscapeKeyPress)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onEscapeKeyPress);
	}

	onEscapeKeyPress = e => {
		if (e.code === 'Escape') {
			this.props.onClose()
		}
	}

	HandleOverlayClose = e => {
		if (e.currentTarget === e.target) {
			this.props.onClose();
		}
	};

	render() {
		return (
			<div className={css.Overlay} onClick={this.HandleOverlayClose}>
				<div className={css.Modal}>
					{this.props.children}
				</div>
			</div>
		)

	}

}


Modal.propTypes = {
	onClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}