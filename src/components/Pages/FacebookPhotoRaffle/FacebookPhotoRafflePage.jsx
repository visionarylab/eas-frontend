import React, { Fragment } from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SubmitButton from '../../SubmitButton/SubmitButton';

import SectionPanel from '../../SectionPanel/SectionPanel';
import MultiValueDisplay from '../../MultiValueDisplay/MultiValueDisplay';
import PrizeSelector from '../../PrizeSelector/PrizeSelector';
import QuickDrawLayout from '../../QuickDrawLayout/QuickDrawLayout';
import withFormValidation from '../../withValidation/withFormValidation';

import Page from '../../Page/Page';
import FacebookLoginButton from '../../FacebookLoginButton/FacebookLoginButton';

const ValidatedForm = withFormValidation(props => <form {...props} />);

const FacebookPhotoRafflePage = props => {
  const {
    values,
    participantsFetched,
    isLoggedInFB,
    userPages,
    onGetLikes,
    onFieldChange,
    handlePublish,
    handleFaceebookLogout,
    t,
  } = props;

  return (
    <Page htmlTitle={t('html_title')}>
      <QuickDrawLayout sidePanel={<Button onClick={handleFaceebookLogout}>FB logout</Button>}>
        <Typography color="primary" variant="display1" align="center">
          {t('page_title')}
        </Typography>
        <Typography variant="body1" align="center" color={'textSecondary'}>
          {t('draw_subheading')}
        </Typography>
        <ValidatedForm
          onSubmit={e => {
            e.preventDefault();
            // handleToss();
          }}
          // checkErrors={() => handleCheckErrorsInConfiguration(t)}
        >
          <SectionPanel>
            {isLoggedInFB ? (
              <Fragment>
                You are logged in. These are the pages were we got access:
                <ul>{userPages && userPages.map(page => <li>{page.pageName}</li>)}</ul>
              </Fragment>
            ) : (
              <Fragment>
                <Typography variant="body1" gutterBottom>
                  Organise a raffle among the people who liked a post or photo in your page
                  <br />
                  Login with facebook so we can automatically get the participants for the raffle
                </Typography>
              </Fragment>
            )}
            <FacebookLoginButton permissions="manage_pages" />
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
            <Button variant="raised" color="primary" onClick={onGetLikes} disabled={!isLoggedInFB}>
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
          <SubmitButton label={t('publish_draw')} onClick={handlePublish} />
        </ValidatedForm>
      </QuickDrawLayout>
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
  userPages: PropTypes.arrayOf(
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
  userPages: [],
};

export default translate('FacebookPhotoRafflePage')(FacebookPhotoRafflePage);
