import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames/bind';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withTranslation, Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import RouterButton from '../../RouterButton/RouterButton.jsx';
// import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import Page from '../../Page/Page.jsx';
// import LearnMoreSection from '../../LearnMoreSection/LearnMoreSection.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
// import ShareUrl from '../../ShareUrl/ShareUrl.jsx';
import STYLES from './PublicDrawCreated.module.scss';

// import STYLES from './PublicDrawCreated.scss';
// import headsIcon from './heads.png';
// import tailsIcon from './tails.png';
// import coinOgImage from './coin_og_image.png';

const analyticsDrawTypeMap = {
  groups: 'Groups',
  facebook: 'FacebookRaffle', // complete this list
};

const PublicDrawCreated = ({ t, match }) => {
  const { drawType, drawId } = match.params;
  const pathUrl = `/${drawType}/${drawId}`;
  const shareUrl = `${window.location.origin}${pathUrl}`;
  return (
    <Page
      htmlTitle={t('html_title')}
      pageType="Public Draw Successfully Created"
      noIndex
      contentClassName={STYLES.Page}
      // TODO if this URL is copied but it's not in the recent draws, should redirect to the draw (strip the /success)
      // It would be great to do that server side
    >
      <Typography align="center" variant="h1" className={STYLES.Title}>
        {t('congratulations')} <br />
        {t('draw_created')}
      </Typography>
      <Typography align="center" variant="body1">
        {t('share_link')}
      </Typography>
      <br />
      <ShareButtons
        drawType={analyticsDrawTypeMap[drawType]}
        url={shareUrl}
        types={['facebook', 'twitter', 'telegram', 'whatsapp', 'url']}
      />
      <RouterButton variant="contained" color="primary" to={pathUrl} className={STYLES.Cta}>
        {t('go_to_the_raffle')}
      </RouterButton>
    </Page>
  );
};

PublicDrawCreated.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('PublicDrawCreated')(PublicDrawCreated);
