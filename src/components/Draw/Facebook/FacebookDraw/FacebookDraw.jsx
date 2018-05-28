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
import STYLES from './FacebookDraw.scss';

const c = classNames.bind(STYLES);

const FacebookDraw = props => {
  const { values, isLoggedInFB, ownedPages, onGetLikes, onFieldChange, handlePublish, t } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{t('facebook_draw_html_title')}</title>
      </Helmet>
      <Grid container spacing={16}>
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
                    <div className={c('FacebookDraw__facebook-button')}>
                      <div
                        className="fb-login-button"
                        data-max-rows="1"
                        data-size="large"
                        data-button-type="continue_with"
                        data-show-faces="false"
                        data-auto-logout-link="false"
                        data-use-continue-as="false"
                        data-scope="manage_pages"
                      />
                    </div>
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
              </SectionPanel>
              <SectionPanel>
                <MultiValueDisplay
                  name="participants"
                  label={props.t('participants')}
                  values={values.participants}
                  placeholder="David"
                />
                <TextField
                  label={props.t('number_of_winners')}
                  placeholder="1"
                  margin="normal"
                  onChange={e => onFieldChange('numberOfWinners', e.target.value)}
                  value={values.numberOfWinners}
                  type="number"
                />
                <PrizeSelector onFieldChange={onFieldChange} />
              </SectionPanel>
              <div>
                <Button variant="raised" color="primary" onClick={handlePublish}>
                  {props.t('publish_draw')}
                </Button>
              </div>
            </Grid>
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

FacebookDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string),
    prizes: PropTypes.arrayOf(PropTypes.string),
    numberOfWinners: PropTypes.number,
    dateScheduled: PropTypes.string,
  }).isRequired,
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

FacebookDraw.defaultProps = {
  isLoggedInFB: false,
  ownedPages: [],
};

export default translate('FacebookDraw')(FacebookDraw);
