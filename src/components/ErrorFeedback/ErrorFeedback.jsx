import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import BannerAlert, { ALERT_TYPES } from '../BannerAlert/BannerAlert';
import STYLES from './ErrorFeedback.scss';

const c = classnames.bind(STYLES);

const ErrorFeedback = ({ error }) => (
  <div className={c('ErrorFeedback')} data-component={'ErrorFeedback'}>
    <BannerAlert title={error} type={ALERT_TYPES.ERROR} />
  </div>
);

ErrorFeedback.propTypes = {
  error: PropTypes.string,
};

ErrorFeedback.defaultProps = {
  error: '',
};

export default ErrorFeedback;
