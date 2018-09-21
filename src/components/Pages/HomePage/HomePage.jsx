import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';

import DrawCard from './../../DrawCard/DrawCard';
import Page from '../../Page/Page';
import rafflesIcon from './raffles.svg';
import randomNumber from './random_number.png';
import arrowIcon from './arrow.svg';
import randomLetter from './random_letter.png';
import groupsIcon from './groups.png';
import coinIcon from './coin.svg';
import diceIcon from './dice.svg';
import cardsIcon from './cards.svg';
import tournamentIcon from './tournament.png';

import STYLES from './HomePage.scss';

const c = classNames.bind(STYLES);

const HomePage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'} className={c('HomePage')}>
    <Typography variant="display1">Sorteos online</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={rafflesIcon} to="/raffles">
        {t('draw_title_raffle_section')}
      </DrawCard>
      <DrawCard icon={groupsIcon} to="/groups">
        Crear equipos
      </DrawCard>
    </div>
    <Typography variant="display1">Generadores básicos al azar</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={randomNumber} to="/number">
        {t('draw_title_random_number')}
      </DrawCard>
      <DrawCard icon={randomLetter} to="/letter">
        {t('draw_title_random_letter')}
      </DrawCard>
    </div>
    <Typography variant="display1">Otros</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={arrowIcon} to="/arrow">
        {t('draw_title_spin_arrow')}
      </DrawCard>
    </div>

    <Typography variant="display1">Not migrated yet</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={coinIcon} externalHref="https://echaloasuerte.com/draw/new/coin/">
        {t('draw_title_flip_coin')}
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
    </div>
  </Page>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
