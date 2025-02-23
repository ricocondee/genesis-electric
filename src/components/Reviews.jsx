import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

const Reviews = ({layout}) => {
    const widgetID = import.meta.env.VITE_FEATURABLE_ID;
  return (
    <ReactGoogleReviews layout={layout} featurableId={widgetID}/>
  )
}

export default Reviews