import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Helmet from 'react-helmet';

import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

const Page = props => (
  <div className={c('Page')}>
    <Helmet>
      <title>{props.htmlTitle}</title>
    </Helmet>
    {props.children}
  </div>
);

Page.propTypes = {
  htmlTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
