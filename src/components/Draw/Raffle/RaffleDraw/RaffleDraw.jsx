import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import RaffleDrawForm from '../RaffleDrawForm/RaffleDrawForm';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../../DrawPanel/DrawPanel';
import TransparentPanel from '../../../TransparentPanel/TransparentPanel';

const RaffleDraw = props => {
  const { title, description, participants, numberOfWinners, dateScheduled } = props.values;
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
            <Paper>{props.t('raffle_seo_description')}</Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

RaffleDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfWinners: PropTypes.number.isRequired,
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
