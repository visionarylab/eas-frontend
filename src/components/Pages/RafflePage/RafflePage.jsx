import React from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../DrawPanel/DrawPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import PublicDetails from '../../PublicDetails/PublicDetails';
import MultiValueInput from '../../MultiValueInput/MultiValueInput';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';
import TossButton from '../../TossButton/TossButton';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';

const RafflePage = props => {
  const {
    title,
    description,
    participants,
    prizes,
    numberOfWinners,
    whenToToss,
    dateScheduled,
  } = props.values;
  return (
    <Page htmlTitle={props.t('raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <Typography variant="display1">{props.t('raffle_default_title')}</Typography>
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
                placeholder="David, María, ..."
                onChange={p => props.onFieldChange('participants', p)}
                messageEmpty={props.t('you_havent_add_any_participants')}
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
            <TossButton label={props.t('publish_raffle')} handlePublish={props.handlePublish} />
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

RafflePage.propTypes = {
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

RafflePage.defaultPropTypes = {
  dateScheduled: Date(),
};

export default translate('RafflePage')(RafflePage);
