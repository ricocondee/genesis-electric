import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import PropTypes from "prop-types";

const Reviews = ({layout}) => {
    const widgetID = import.meta.env.VITE_FEATURABLE_ID;
  return (
    <ReactGoogleReviews layout={layout} featurableId={widgetID}/>
  )
}
Reviews.propTypes = {
  layout: PropTypes.string.isRequired,
};

export default Reviews;