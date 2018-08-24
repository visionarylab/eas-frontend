import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

import Chip from './../../DrawCard/DrawCard';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import Page from '../../Page/Page';
import likeIcon from './like.jpg';
import facebookIcon from './facebook.png';
import raffleIcon from './raffle.svg';

import STYLES from './RafflesSectionPage.scss';

const c = classNames.bind(STYLES);

const RafflesSectionPage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'}>
    <TransparentPanel className={c('RafflesSectionPage__container')}>
      <div className={c('RafflesSectionPage__draw-chips-list')}>
        <Chip icon={facebookIcon} href="/facebook_login">
          {t('facebook_login_raffle_title')}
        </Chip>
        <Chip icon={likeIcon} href="/facebook_photo">
          {t('facebook_photo_raffle_title')}
        </Chip>
        <Chip icon={raffleIcon} href="/raffle">
          {t('raffle_title')}
        </Chip>
      </div>
    </TransparentPanel>
  </Page>
);

RafflesSectionPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('RafflesSectionPage')(RafflesSectionPage);
