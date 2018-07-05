import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

import Chip from './../../DrawCard/DrawCard';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import Page from '../../Page/Page';
import likeIcon from './like.jpg';
import facebookIcon from './facebook.png';
import raffleIcon from './raffle.png';

const RafflesSectionPage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'}>
    <Grid container justify="center">
      <Grid item sm={8}>
        <TransparentPanel>
          {/* <Grid container justify="center"> */}
          <Grid item sm={6}>
            <Chip icon={facebookIcon} href="/facebook_login">
              {t('facebook_login_raffle_title')}
            </Chip>
          </Grid>
          <Grid item sm={6}>
            <Chip icon={likeIcon} href="/facebook_photo">
              {t('facebook_photo_raffle_title')}
            </Chip>
          </Grid>
          <Grid item sm={6}>
            <Chip icon={raffleIcon} href="/raffle">
              {t('raffle_title')}
            </Chip>
          </Grid>
          {/* </Grid> */}
        </TransparentPanel>
      </Grid>
    </Grid>
  </Page>
);

RafflesSectionPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('RafflesSectionPage')(RafflesSectionPage);
