import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

// import DrawCard from './../../DrawCard/DrawCard';
import Page from '../../Page/Page';
// import likeIcon from './like.jpg';
// import facebookIcon from './facebook.png';
// import raffleIcon from './raffle.svg';

import STYLES from './RafflesSectionPage.scss';

const c = classNames.bind(STYLES);

const RafflesSectionPage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'}>
    {/* <div className={c('RafflesSectionPage__draw-chips-list')}>
      <DrawCard icon={facebookIcon} to="/facebook_login">
        {t('facebook_login_raffle_title')}
      </DrawCard>
      <DrawCard icon={likeIcon} to="/facebook_photo">
        {t('facebook_photo_raffle_title')}
      </DrawCard>
      <DrawCard icon={raffleIcon} to="/raffle">
        {t('raffle_title')}
      </DrawCard>
    </div> */}
  </Page>
);

RafflesSectionPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('RafflesSectionPage')(RafflesSectionPage);
