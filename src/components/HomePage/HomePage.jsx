import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from 'react-translate';
import Grid from 'material-ui/Grid';

import Chip from './../DrawCard/DrawCard';
import TransparentPanel from '../TransparentPanel/TransparentPanel';

const HomePage = ({ t }) => (
  <Grid container justify="center">
    <Grid item sm={8}>
      <Helmet>
        <title>Échalo A Suerte</title>
      </Helmet>
      <TransparentPanel>
        <Grid container justify="center">
          <Grid item sm={6}>
            <Chip
              icon="https://echaloasuerte.com/static/img/draw_icons/random_number.dd452a269894.png"
              href="/number"
            >
              {t('random_number_title')}
            </Chip>
          </Grid>
          <Grid item sm={6}>
            <Chip
              icon="https://echaloasuerte.com/static/img/draw_icons/random_letter.07b9689f39d4.png"
              href="/letter"
            >
              {t('random_letter_title')}
            </Chip>
          </Grid>
          <Grid item sm={6}>
            <Chip
              icon="https://echaloasuerte.com/static/img/draw_icons/raffle.ecc02d7cd162.png"
              href="/raffle"
            >
              {t('raffle_title')}
            </Chip>
          </Grid>
        </Grid>
      </TransparentPanel>
    </Grid>
  </Grid>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
