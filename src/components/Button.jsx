import PropTypes from 'prop-types';
import ButtonStyles from '../styles/Button.module.css'

const Button = ({text, url, icon}) => {
  return (
    <button className={ButtonStyles.button}><div className={ButtonStyles.icon}>{icon}</div><a href={url} target='blank'>{text}</a></button>
  )
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Button