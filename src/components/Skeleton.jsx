import React from 'react';
import styles from '../styles/Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius }) => {
  const style = {
    width,
    height,
    borderRadius,
  };

  return <div className={styles.skeleton} style={style}></div>;
};

export default Skeleton;
