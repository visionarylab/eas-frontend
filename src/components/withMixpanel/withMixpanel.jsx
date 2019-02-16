import React from 'react';
import { MixpanelConsumer } from 'react-mixpanel';

const withMixpanel = WrappedComponent => {
  const WithMixpanel = props => (
    <MixpanelConsumer>
      {mixpanel => <WrappedComponent mixpanel={mixpanel} {...props} />}
    </MixpanelConsumer>
  );

  return WithMixpanel;
};

export default withMixpanel;
