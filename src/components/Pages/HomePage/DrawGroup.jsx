import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import STYLES from './DrawGroup.module.scss';

const DrawGroup = ({ title, children }) => (
  <div>
    <Typography className={STYLES.container} variant="h1">
      {title}
    </Typography>
    {children}
  </div>
);

DrawGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DrawGroup;
