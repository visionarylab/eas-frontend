import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'material-ui';

import STYLES from './BackArrow.scss';

const BackArrow = () => (
  <Link to={'/'}>
    <Icon className={STYLES.BackArrow__icon}>keyboard_arrow_left</Icon>
  </Link>
);

export default BackArrow;
