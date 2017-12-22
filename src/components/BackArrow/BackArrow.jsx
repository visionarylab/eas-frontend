import React from 'react';
import { Link } from 'react-router-dom';
import ChevronLeft from 'material-ui-icons/ChevronLeft';

import STYLES from './BackArrow.scss';

const BackArrow = () => (
  <Link to={'/'} className={STYLES.BackArrow}>
    <ChevronLeft className={STYLES.BackArrow__icon} />
  </Link>
);

export default BackArrow;
