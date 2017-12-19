import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';

import STYLES from './BackArrow.scss';

const BackArrow = () => (
  <Link to={'/'} className={STYLES.BackArrow}>
    <Icon className={STYLES.BackArrow__icon}>keyboard_arrow_left</Icon>
    <Icon color="action">add_circle</Icon>
  </Link>
);

export default BackArrow;
