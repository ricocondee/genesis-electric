import PropTypes from 'prop-types';
import ButtonStyles from '../styles/Button.module.css'

const MyLink = ({text, url, icon}) => {
  return (
    <>
    <a href={url} target='blank' className={ButtonStyles.button}>{icon}{text}</a>
    </>
  )
}
MyLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MyLink