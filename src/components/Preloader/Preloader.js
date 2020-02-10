import React from 'react';
import styles from './Preloader.module.css';

import PreloaderSvg from '../../assets/Preloader.svg';

export const Preloader = () => {
  return (
    <div className="container">
      <div className={styles.preloader}>
        <img src={PreloaderSvg} alt="Loading..." />
      </div>
    </div>
  );
};
