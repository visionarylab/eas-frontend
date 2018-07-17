import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';

import WinnersList from '../WinnersList/WinnersList';
import trumpetIcon from './trumpet.png';
import STYLES from './ResultsBox.scss';

const c = classNames.bind(STYLES);

const TrumpetIcon = ({ inverted }) => (
  <img
    src={trumpetIcon}
    className={c('ResultsBox__trumpet-icon', {
      'ResultsBox__trumpet-icon--flipped': inverted,
    })}
    alt={inverted}
  />
);

const WinnersTitle = ({ winnersLabel }) => (
  <Grid container direction={'row'}>
    <Grid item>
      <TrumpetIcon inverted />
    </Grid>
    <Grid item>
      <Typography variant="display1" component={'p'}>
        {winnersLabel}
      </Typography>
    </Grid>
    <Grid item>
      <TrumpetIcon />
    </Grid>
  </Grid>
);

const ResultsBox = ({ title, children }) => (
  <section className={c('ResultsBox__results-panel')}>
    <Grid container spacing={16} direction={'column'} alignItems={'center'}>
      <Grid item>
        <WinnersTitle winnersLabel={title} />
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  </section>
);

ResultsBox.propTypes = {};

export default ResultsBox;
