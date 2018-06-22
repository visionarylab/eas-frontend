import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import STYLES from './PublicSummaryPanel.scss';

const c = classNames.bind(STYLES);

const PublicSummaryPanel = props => (
  <section className={c('PublicSummaryPanel')}>{props.children}</section>
);

PublicSummaryPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicSummaryPanel;
