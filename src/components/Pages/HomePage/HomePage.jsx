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

import STYLES from './HomePage.scss';

const c = classNames.bind(STYLES);

const HomePage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'} className={c('HomePage')}>
    <Typography variant="display1">Sorteos online</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={rafflesIcon} to="/raffles">
        {t('raffle_section_title')}
      </DrawCard>
      <DrawCard icon={groupsIcon} to="/groups">
        Crear equipos
      </DrawCard>
    </div>
    <Typography variant="display1">Generadores básicos al azar</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={randomNumber} to="/number">
        {t('random_number_title')}
      </DrawCard>
      <DrawCard icon={randomLetter} to="/letter">
        {t('random_letter_title')}
      </DrawCard>
    </div>
    <Typography variant="display1">Otros</Typography>
    <div className={c('HomePage__draw-chips-group')}>
      <DrawCard icon={arrowIcon} to="/arrow">
        {t('spin_arrow_title')}
      </DrawCard>

      <DrawCard icon={coinIcon} externalHref="https://echaloasuerte.com/draw/new/coin/">
        {t('flip_coin_title')}
      </DrawCard>
    </div>
  </Page>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
