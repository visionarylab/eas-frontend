import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames/bind';

import STYLES from './DrawCard.scss';

const c = classNames.bind(STYLES);

const DrawCard = props => (
  <NavLink className={c('DrawCard__link')} to={props.href}>
    <Paper className={c('DrawCard')}>
      <img className={c('DrawCard__icon')} src={props.icon} alt={props.children} />
      <Typography className={c('DrawCard__title')} variant="subheading">
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
