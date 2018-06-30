import React from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DrawPanel from '../../DrawPanel/DrawPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';
import PublicDetails from '../../PublicDetails/PublicDetails';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import TossButton from '../../TossButton/TossButton';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';

const FacebookLoginRafflePage = props => {
  const { values, onFieldChange, handlePublish, t } = props;

  return (
    <Page htmlTitle={t('facebook_draw_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <Typography variant="display1">{t('facebook_login_raffle_default_title')}</Typography>
            <SectionPanel title={t('general_details_raffle')}>
              <PublicDetails
                title={values.title}
                description={values.description}
                onFieldChange={props.onFieldChange}
              />
            </SectionPanel>
            <SectionPanel title={t('info_about_winners')}>
              <PrizeSelector
                numberOfWinners={values.numberOfWinners}
                prizes={values.prizes}
                onFieldChange={onFieldChange}
              />
              <br />
              <Paper>
                <p>
                  <Trans i18nKey="how_to_participate">
                    Once you publish the raffle, you will get a link that you will be able to share
                    it with others. To participate, they will need to login with facebook.
                  </Trans>
                </p>
              </Paper>
            </SectionPanel>
            <SectionPanel title={t('when_to_toss')}>
              <PublishDrawOptions
                whenToToss={values.whenToToss}
                options={['manual', 'schedule']}
                dateScheduled={values.dateScheduled}
                onFieldChange={props.onFieldChange}
              />
            </SectionPanel>
            <TossButton label={props.t('publish_raffle')} handlePublish={handlePublish} />
          </DrawPanel>
        </Grid>
        <Grid item xs={3}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="facebook_draw_seo_description">
                <span>Organize raffles in your Facebook page</span>
              </Trans>
            </Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

FacebookLoginRafflePage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    prizes: PropTypes.arrayOf(PropTypes.string),
    numberOfWinners: PropTypes.number,
    dateScheduled: PropTypes.string,
    whenToToss: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

FacebookLoginRafflePage.defaultProps = {
  isLoggedInFB: false,
  ownedPages: [],
};

export default translate('FacebookLoginRafflePage')(FacebookLoginRafflePage);
