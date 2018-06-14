import React, { Fragment } from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames/bind';

import DrawPanel from '../../../DrawPanel/DrawPanel';
import SectionPanel from '../../../SectionPanel/SectionPanel';
import MultiValueInput from '../../../MultiValueInput/MultiValueInput';
import MultiValueDisplay from '../../../MultiValueDisplay/MultiValueDisplay';
import TransparentPanel from '../../../TransparentPanel/TransparentPanel';
import PrizeSelector from '../../../PrizeSelector/PrizeSelector';
import PublicDetails from '../../../PublicDetails/PublicDetails';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import TossButton from '../../../TossButton/TossButton';
import STYLES from './FacebookLoginDraw.scss';

const c = classNames.bind(STYLES);

const FacebookLoginDraw = props => {
  const { values, onFieldChange, handlePublish, t } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{t('facebook_draw_html_title')}</title>
      </Helmet>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <DrawPanel>
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
        <Grid item xs={6}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="facebook_draw_seo_description">
                <span>Organize raffles in your Facebook page</span>
              </Trans>
            </Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

FacebookLoginDraw.propTypes = {
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

FacebookLoginDraw.defaultProps = {
  isLoggedInFB: false,
  ownedPages: [],
};

export default translate('FacebookLoginDraw')(FacebookLoginDraw);
