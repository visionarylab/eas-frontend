import React from 'react';
import ReactGA from 'react-ga';
import withMixpanel from '../withMixpanel/withMixpanel.jsx';
import config from '../../config/config';

const withTracking = WrappedComponent => {
  const WithTracking = props => {
    const { mixpanel } = props;
    const track = ({ mp, ga }) => {
      if (config.analiticsEnabled) {
        if (mp) {
          const { name, properties } = mp;
          mixpanel.track(name, properties);
        }
        if (ga) {
          const { category, action, label } = ga;
          ReactGA.event({ category, action, label });
        }
      }
    };
    return <WrappedComponent track={track} {...props} />;
  };

  return withMixpanel(WithTracking);
};

export default withTracking;
