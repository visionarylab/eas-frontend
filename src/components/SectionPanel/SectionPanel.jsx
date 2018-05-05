import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './SectionPanel.scss';

const c = className => STYLES[className];

const SectionPanel = props => <div className={c('SectionPanel')}>{props.children}</div>;

SectionPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionPanel;
