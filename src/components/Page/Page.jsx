import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Helmet from 'react-helmet';
import withGoogleAnalyticsTracker from '../withGoogleAnalyticsTracker/withGoogleAnalyticsTracker';

import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

const Page = props => (
  <Fragment>
    <Helmet>
      <title>{props.htmlTitle}</title>
      {props.noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
    <div className={c('Page', props.className)}>{props.children}</div>
  </Fragment>
);

Page.propTypes = {
  htmlTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  noIndex: PropTypes.bool,
};

Page.defaultProps = {
  className: null,
  noIndex: false,
};

export default withGoogleAnalyticsTracker(Page);
