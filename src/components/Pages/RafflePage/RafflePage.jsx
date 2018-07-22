import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DrawPanel from '../../DrawPanel/DrawPanel';

import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';
import RaffleFormContainer from './RaffleFormContainer';

const RafflePage = props => {
  const { t } = props;
  return (
    <Page htmlTitle={t('raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={2}>
          <BackArrow />
        </Grid>
        <Grid item xs={8}>
          <DrawPanel>
            <RaffleFormContainer />
          </DrawPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

RafflePage.propTypes = {
  t: PropTypes.func.isRequired,
};

RafflePage.defaultPropTypes = {};

export default translate('RafflePage')(RafflePage);
