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
import SubmitButton from '../../SubmitButton/SubmitButton';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';

const RafflePage = props => {
  const { t } = props;
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
    <Page htmlTitle={t('raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={2}>
          <BackArrow />
        </Grid>
        <Grid item xs={8}>
          <DrawPanel>
            <Grid container direction={'column'} spacing={8}>
              <Grid item>
                <Typography variant="display1">{t('raffle_default_title')}</Typography>
              </Grid>
              <Grid item>
                <SectionPanel title={t('general_details_raffle')}>
                  <PublicDetails
                    title={title}
                    description={description}
                    onFieldChange={props.onFieldChange}
                  />
                </SectionPanel>
              </Grid>
              <Grid item>
                <SectionPanel title={t('who_will_participate')}>
                  <MultiValueInput
                    name="participants"
                    label={t('participants')}
                    labelDisplayList={t('list_of_participants')}
                    values={participants}
                    placeholder="David, María, ..."
                    onChange={p => props.onFieldChange('participants', p)}
                    messageEmpty={t('you_havent_add_any_participants')}
                    fullWidth
                    inputProps={{ 'data-component': 'ParticipantsInput' }}
                  />
                </SectionPanel>
                <SectionPanel title={t('detail_about_winners')}>
                  <PrizeSelector
                    numberOfWinners={numberOfWinners}
                    prizes={prizes}
                    onFieldChange={props.onFieldChange}
                  />
                </SectionPanel>
                {/* <SectionPanel title={t('when_to_toss')}>
              <PublishDrawOptions
              whenToToss={whenToToss}
              options={['manual', 'schedule']}
                dateScheduled={dateScheduled}
                onFieldChange={props.onFieldChange}
                />
              </SectionPanel> */}
                <SubmitButton label={t('publish_raffle')} handlePublish={props.handlePublish} />
              </Grid>
            </Grid>
          </DrawPanel>
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
