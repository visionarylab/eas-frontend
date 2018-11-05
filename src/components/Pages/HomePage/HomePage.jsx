import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import DrawCard from '../../DrawCard/DrawCard';
import Page from '../../Page/Page';
import randomNumber from './random_number.png';
import arrowIcon from './arrow.svg';
import groupsIcon from './groups.png';
import coinIcon from './coin.svg';
// import randomLetter from './random_letter.png';
// import diceIcon from './dice.svg';
// import cardsIcon from './cards.svg';
// import tournamentIcon from './tournament.png';
// import likeIcon from './like.jpg';
// import facebookIcon from './facebook.png';
import raffleIcon from './raffle.svg';

import STYLES from './HomePage.scss';

const c = classNames.bind(STYLES);

const HomePage = ({ t }) => (
  <Page htmlTitle="Échalo A Suerte" className={c('HomePage')}>
    <div className={c('HomePage__container')}>
      <Typography variant="h1">{t('section_title_online_raffles')}</Typography>
      <div className={c('HomePage__draw-chips-group')}>
        <DrawCard icon={raffleIcon} to="/raffle">
          {t('draw_title_raffle')}
        </DrawCard>
        <DrawCard icon={groupsIcon} to="/groups">
          {t('draw_title_groups_generator')}
        </DrawCard>
        <DrawCard icon={randomNumber} to="/number">
          {t('draw_title_random_number')}
        </DrawCard>
      </div>
      <Typography variant="h1"> {t('section_title_simple_draws')}</Typography>
      <div className={c('HomePage__draw-chips-group')}>
        <DrawCard icon={coinIcon} to="flip-a-coin">
          {t('draw_title_flip_coin')}
        </DrawCard>
        <DrawCard icon={arrowIcon} to="/arrow">
          {t('draw_title_spin_arrow')}
        </DrawCard>
      </div>

      {/* <Typography variant="h1">Not migrated yet</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={randomLetter} to="/letter">
        {t('draw_title_random_letter')}
      </DrawCard>
      <DrawCard icon={diceIcon} externalHref="https://echaloasuerte.com/draw/new/dice/">
        {t('draw_title_roll_dice')}
      </DrawCard>
      <DrawCard icon={cardsIcon} externalHref="https://echaloasuerte.com/draw/new/cards/">
        {t('draw_title_pick_card')}
      </DrawCard>
      <DrawCard icon={tournamentIcon} externalHref="https://echaloasuerte.com/draw/new/tournament/">
        {t('draw_title_tournament')}
      </DrawCard>
      <DrawCard icon={facebookIcon} to="/facebook_login">
        {t('draw_title_facebook_login')}
      </DrawCard>
      <DrawCard icon={likeIcon} to="/facebook_photo">
        {t('draw_title_facebook_photo')}
      </DrawCard>
    </div> */}
    </div>
  </Page>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
