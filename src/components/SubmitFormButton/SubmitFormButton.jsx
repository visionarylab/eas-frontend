import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames/bind';
import STYLES from './SubmitFormButton.scss';
import { ValidationContext } from '../FormValidation/ValidationProvider.jsx';
import { shouldUseNewForm } from '../../services/abtest';

const c = classNames.bind(STYLES);
const SubmitFormButton = ({ label, onClick: handleSubmitButtonClick }) => {
  const { handleFormSubmit } = useContext(ValidationContext);
  const handleSubmitClick = event => {
    handleSubmitButtonClick(event);
    handleFormSubmit(event);
  };
  const useNewForm = shouldUseNewForm();
  return (
    <div className={c('SubmitFormButton')}>
      <Button
        type={useNewForm ? 'button' : 'submit'}
        variant="contained"
        color="primary"
        onClick={handleSubmitClick}
        data-testid="SubmitFormButton"
      >
        {label}
      </Button>
    </div>
  );
};

SubmitFormButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

SubmitFormButton.defaultProps = {
  onClick: () => {},
};

export default SubmitFormButton;
