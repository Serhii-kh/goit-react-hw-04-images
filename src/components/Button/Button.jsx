import css from './Button.module.css'
import PropTypes from 'prop-types'

export const Button = ({ type, children, onClick }) => (
	<button type={type} className={css.Button} onClick={onClick}>
		{children}
	</button>
)


Button.propTypes = {
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func,
}