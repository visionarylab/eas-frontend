/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withTranslation } from '../../i18n';

import STYLES from './PrizesOverview.module.scss';

const PrizesOverview = ({ prizes, t }) => (
  <div className={STYLES.container}>
    <Typography variant="h2">{t('prizes_label')}</Typography>
    <ul className={STYLES.list}>
      {prizes.map((prize, i) => (
        <li key={`prize-${prize.id}-${i}`}>
          <Chip label={prize.name} />
        </li>
      ))}
    </ul>
  </div>
);

PrizesOverview.propTypes = {
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('CommonDrawRaffle')(PrizesOverview);
