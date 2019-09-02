import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import withMixpanel from '../withMixpanel/withMixpanel.jsx';
import config from '../../config/config';

const withTracking = WrappedComponent => {
  const WithTracking = props => {
    const { mixpanel } = props;
    const track = ({ mp, ga }) => {
      if (config.googleAnalyticsEnabled && ga) {
        const { category, action, label } = ga;
        ReactGA.event({ category, action, label });
      }
      if (config.mixpanelEnabled && mp) {
        const { name, properties } = mp;
        mixpanel.track(name, properties);
      }
    };
    return <WrappedComponent track={track} {...props} />;
  };

  WithTracking.propTypes = {
    mixpanel: PropTypes.shape(),
  };
  WithTracking.defaultProps = {
    mixpanel: null,
  };

  return withMixpanel(WithTracking);
};

export default withTracking;
