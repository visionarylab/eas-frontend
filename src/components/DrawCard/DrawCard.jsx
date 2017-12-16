import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import STYLE from './DrawCard.scss';

const DrawCard = props => (
  <NavLink to={props.href}>
    <Paper className={STYLE.DrawCard}>
      <img className={STYLE.DrawCard__icon} src={props.icon} alt={props.children} />
      <Typography type="subheading">
        {props.children}
      </Typography>
    </Paper>
  </NavLink>
);

DrawCard.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default DrawCard;
