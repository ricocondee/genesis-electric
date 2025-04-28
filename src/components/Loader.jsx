import React from "react";
import styles from "../styles/Loader.module.css"; // Suponiendo que creas un archivo CSS para el loader

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
