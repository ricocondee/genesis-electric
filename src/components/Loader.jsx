import { Snowflake } from "lucide-react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Snowflake className={styles.snowflake} size={64} />
    </div>
  );
};

export default Loader;
