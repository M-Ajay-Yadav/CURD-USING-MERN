import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alerts.module.css'; // Import CSS file for styling

const Alerts = ({ message, type, onClose }) => {
  return (
    <div className={styles.alertContainer}>
      <div className={`${styles.alert} ${styles[`alert-${type}`]}`}>
        <span className={styles.alertMessage}>{message}</span>
        <button className={styles.alertClose} onClick={onClose}>X</button>
      </div>
    </div>
  );
};

Alerts.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alerts;
