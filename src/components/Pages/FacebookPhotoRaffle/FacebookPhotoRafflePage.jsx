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

import DrawPanel from '../../DrawPanel/DrawPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import MultiValueInput from '../../MultiValueInput/MultiValueInput';
import MultiValueDisplay from '../../MultiValueDisplay/MultiValueDisplay';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton';

import STYLES from './FacebookPhotoRafflePage.scss';

const c = classNames.bind(STYLES);

const FacebookPhotoRafflePage = props => {
  const {
    values,
    participantsFetched,
    isLoggedInFB,
    ownedPages,
    onGetLikes,
    onFieldChange,
    handlePublish,
    t,
  } = props;

  return (
    <Page htmlTitle={t('facebook_photo_raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <Grid item sm={12}>
              <SectionPanel>
                {isLoggedInFB ? (
                  <Fragment>
                    You are logged in. These are the pages were we got access:
                    <ul>{ownedPages.map(page => <li>{page.pageName}</li>)}</ul>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography variant="body1" gutterBottom>
                      Organise a raffle among the people who liked a post or photo in your page
                      <br />
                      Login with facebook so we can automatically get the participants for the
                      raffle
                    </Typography>
                    <FacebookLoginButton permissions="manage_pages" />
                  </Fragment>
                )}
              </SectionPanel>
              <SectionPanel>
                Now paste here the link to the post you want to check
                <TextField
                  label={t('post_or_photo_url')}
                  margin="normal"
                  onChange={e => onFieldChange('url', e.target.value)}
                  value={values.url}
                  type="text"
                  fullWidth
                  disabled={!isLoggedInFB}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={onGetLikes}
                  disabled={!isLoggedInFB}
                >
                  {t('check_participants')}
                </Button>
                {participantsFetched && (
                  <MultiValueDisplay
                    name="participants"
                    label={props.t('participants')}
                    values={values.participants}
                    placeholder="David"
                  />
                )}
              </SectionPanel>
              <SectionPanel>
                <PrizeSelector
                  numberOfWinners={values.numberOfWinners}
                  prizes={values.prizes}
                  onFieldChange={onFieldChange}
                />
              </SectionPanel>
              <div>
                <Button variant="raised" color="primary" onClick={handlePublish}>
                  {props.t('publish_draw')}
                </Button>
              </div>
            </Grid>
          </DrawPanel>
        </Grid>
        <Grid item xs={3}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="facebook_photo_raffle_seo_description">
                <span>Organize raffles in your Facebook page</span>
              </Trans>
            </Paper>
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

FacebookPhotoRafflePage.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string),
    prizes: PropTypes.arrayOf(PropTypes.string),
    numberOfWinners: PropTypes.number,
    dateScheduled: PropTypes.string,
  }).isRequired,
  participantsFetched: PropTypes.bool.isRequired,
  isLoggedInFB: PropTypes.bool,
  ownedPages: PropTypes.arrayOf(
    PropTypes.shape({
      pageName: PropTypes.string.isRequired,
      accessToken: PropTypes.string.isRequired,
    }),
  ),
  t: PropTypes.func.isRequired,
  onGetLikes: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

FacebookPhotoRafflePage.defaultProps = {
  isLoggedInFB: false,
  ownedPages: [],
};

export default translate('FacebookPhotoRafflePage')(FacebookPhotoRafflePage);
