import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames/bind';
import STYLES from './SubmitButton.scss';

const c = classNames.bind(STYLES);
const SubmitButton = ({ label, onClick }) => (
  <div data-component={'SubmitDrawButton'} className={c('SubmitButton')}>
    <Button variant="raised" color="primary" onClick={onClick}>
      {label}
    </Button>
  </div>
);

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
