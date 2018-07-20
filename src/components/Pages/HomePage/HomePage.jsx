import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

import Chip from './../../DrawCard/DrawCard';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import Page from '../../Page/Page';
import rafflesIcon from './raffles.png';

const HomePage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'}>
    <Grid container justify="center">
      <Grid item sm={8}>
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
              <Chip icon={rafflesIcon} href="/raffles">
                {t('raffle_section_title')}
              </Chip>
            </Grid>
          </Grid>
        </TransparentPanel>
      </Grid>
    </Grid>
  </Page>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
