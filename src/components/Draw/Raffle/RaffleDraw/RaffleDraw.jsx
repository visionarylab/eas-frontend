import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../../DrawPanel/DrawPanel';
import TransparentPanel from '../../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../../SectionPanel/SectionPanel';
import PublicDetails from '../../../PublicDetails/PublicDetails';
import MultiValueInput from '../../../MultiValueInput/MultiValueInput';
import PrizeSelector from '../../../PrizeSelector/PrizeSelector';
import TossButton from '../../../TossButton/TossButton';
import BackArrow from '../../../BackArrow/BackArrow';
import Page from '../../../Page/Page';

const RaffleDraw = props => {
  const {
    title,
    description,
    participants,
    prizes,
    numberOfWinners,
    whenToToss,
    dateScheduled,
    handlePublish,
  } = props.values;
  return (
    <Page htmlTitle={props.t('raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <SectionPanel title={props.t('general_details_raffle')}>
              <PublicDetails
                title={title}
                description={description}
                onFieldChange={props.onFieldChange}
              />
            </SectionPanel>
            <SectionPanel title={props.t('who_will_participate')}>
              <MultiValueInput
                name="participants"
                label={props.t('participants')}
                values={participants}
                placeholder="David"
                onChange={p => props.onFieldChange('participants', p)}
                fullWidth
              />
            </SectionPanel>
            <SectionPanel title={props.t('detail_about_winners')}>
              <PrizeSelector
                numberOfWinners={numberOfWinners}
                prizes={prizes}
                onFieldChange={props.onFieldChange}
              />
            </SectionPanel>
            <SectionPanel title={props.t('when_to_toss')}>
              <PublishDrawOptions
                whenToToss={whenToToss}
                options={['now', 'manual', 'schedule']}
                dateScheduled={dateScheduled}
                onFieldChange={props.onFieldChange}
              />
            </SectionPanel>
            <TossButton label={props.t('publish_raffle')} handlePublish={handlePublish} />
          </DrawPanel>
        </Grid>
        <Grid item xs={3}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="raffle_seo_description">
                <span>Organiza sorteos publicos</span>
              </Trans>
            </Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
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
