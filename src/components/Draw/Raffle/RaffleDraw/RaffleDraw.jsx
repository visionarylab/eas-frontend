import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import RaffleDrawForm from '../RaffleDrawForm/RaffleDrawForm';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../../DrawPanel/DrawPanel';
import TransparentPanel from '../../../TransparentPanel/TransparentPanel';

const RaffleDraw = props => {
  const { title, description, participants, prizes, numberOfWinners, dateScheduled } = props.values;
  return (
    <Fragment>
      <Helmet>
        <title>{props.t('raffle_html_title')}</title>
      </Helmet>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <DrawPanel>
            <RaffleDrawForm
              title={title}
              description={description}
              participants={participants}
              prizes={prizes}
              numberOfWinners={numberOfWinners}
              onFieldChange={props.onFieldChange}
            />
            <PublishDrawOptions
              labelPublish={props.t('publish_draw')}
              dateScheduled={dateScheduled}
              onFieldChange={props.onFieldChange}
              handlePublish={props.handlePublish}
            />
          </DrawPanel>
        </Grid>
        <Grid item xs={6}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="raffle_seo_description">
                <span>Organiza sorteos publicos</span>
              </Trans>
            </Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

RaffleDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    prizes: PropTypes.arrayOf(PropTypes.string),
    numberOfWinners: PropTypes.number,
    dateScheduled: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

RaffleDraw.defaultPropTypes = {
  dateScheduled: Date(),
};

export default translate('RaffleDraw')(RaffleDraw);
