import PropTypes from 'prop-types';
import ButtonStyles from '../styles/Button.module.css'

const Button = ({text, url}) => {
  return (
    <div className={ButtonStyles.button}><a href={url}>{text}</a></div>
  )
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Button