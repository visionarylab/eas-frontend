import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from 'react-translate';
import Grid from 'material-ui/Grid';

import Chip from './../DrawCard/DrawCard';

const Home = ({ t }) => (
  <Grid container justify="center">
    <Helmet>
      <title>Échalo A Suerte</title>
    </Helmet>
    <Grid item sm={4}>
      <Chip
        icon="https://echaloasuerte.com/static/img/draw_icons/raffle.ecc02d7cd162.png"
        href="/number"
      >
        {t('random_number_title')}
      </Chip>
    </Grid>
    <Grid item sm={4}>
      <Chip
        icon="https://echaloasuerte.com/static/img/draw_icons/random_letter.07b9689f39d4.png"
        href="/letter"
      >
        {t('random_letter_title')}
      </Chip>
    </Grid>
  </Grid>
);

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('Home')(Home);
