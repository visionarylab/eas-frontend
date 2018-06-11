import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import STYLES from './SectionPanel.scss';

const c = className => STYLES[className];

const SectionPanel = props => (
  <div className={c('SectionPanel')}>
    <Typography variant="title">{props.title}</Typography>
    {props.children}
  </div>
);

SectionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionPanel;
