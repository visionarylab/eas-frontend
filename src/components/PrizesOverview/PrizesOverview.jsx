import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames/bind';

import STYLES from './PrizesOverview.scss';

const c = classNames.bind(STYLES);

const PrizesOverview = ({ prizes, t }) => (
  <div>
    <Typography variant="display1">{t('prizes')}</Typography>
    <ul className={c('PrizesOverview__prizes-list')}>
      {prizes.map((prize, i) => (
        <li>
          <Chip key={`prize${i}`} label={prize} />
        </li>
      ))}
    </ul>
  </div>
);

PrizesOverview.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('PrizesOverview')(PrizesOverview);
