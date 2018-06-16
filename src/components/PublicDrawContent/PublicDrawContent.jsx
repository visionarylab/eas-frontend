import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import TransparentPanel from '../TransparentPanel/TransparentPanel';

import STYLES from './PublicDrawContent.scss';

const c = classNames.bind(STYLES);

const PublicDrawContent = props => (
  <TransparentPanel className={c('PublicDrawContent')}>{props.children}</TransparentPanel>
);

PublicDrawContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicDrawContent;
