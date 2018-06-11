import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames/bind';
import STYLES from './TossButton.scss';

const c = classNames.bind(STYLES);
const TossButton = ({ label, handlePublish }) => (
  <div className={c('TossButton')}>
    <Button variant="raised" color="primary" onClick={handlePublish}>
      {label}
    </Button>
  </div>
);

TossButton.propTypes = {
  label: PropTypes.string.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

export default TossButton;
