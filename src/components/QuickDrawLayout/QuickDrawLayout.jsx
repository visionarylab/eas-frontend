import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';

import STYLES from './QuickDrawLayout.scss';

const c = classNames.bind(STYLES);

class QuickDrawLayout extends Component {
  render() {
    const { sidePanel, children } = this.props;
    return (
      <div className={c('QuickDrawLayout__container')}>
        <div className={c('QuickDrawLayout__content')}>{children}</div>
        <div className={c('QuickDrawLayout__side-panel')}>{sidePanel}</div>
      </div>
    );
  }
}

QuickDrawLayout.propTypes = {
  sidePanel: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

QuickDrawLayout.defaultProps = {
  className: null,
  noIndex: false,
};

export default withRouter(QuickDrawLayout);
