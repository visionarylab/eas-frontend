import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

const Page = props => <div className={c('Page')}>{props.children}</div>;

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
