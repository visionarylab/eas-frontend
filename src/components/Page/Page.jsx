import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Helmet from 'react-helmet';

import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

const Page = props => (
  <Fragment>
    <Helmet>
      <title>{props.htmlTitle}</title>
    </Helmet>
    <div className={c('Page', props.className)}>{props.children}</div>
  </Fragment>
);

Page.propTypes = {
  htmlTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {
  className: null,
};

export default Page;
