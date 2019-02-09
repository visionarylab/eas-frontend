import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parserUA from 'ua-parser-js';

export const DeviceContext = React.createContext();

class DeviceDetector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAgentString: props.userAgent,
    };
  }

  componentDidMount() {
    const { userAgent: userAgentString } = this.props;

    const isMobile = parserUA(userAgentString);
    this.setState({ userAgentString, isMobile });
  }

  render() {
    const { userAgentString } = this.state;
    const isMobile = parserUA(userAgentString).device.type === 'mobile';
    const context = {
      ...this.state,
      isMobile,
    };
    const { children } = this.props;
    return <DeviceContext.Provider value={context}>{children}</DeviceContext.Provider>;
  }
}
DeviceDetector.propTypes = {
  userAgent: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DeviceDetector;
