import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

import Chip from './../../DrawCard/DrawCard';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import Page from '../../Page/Page';
import rafflesIcon from './raffles.png';
import randomNumber from './random_number.png';
import randomLetter from './random_letter.png';

import STYLES from './HomePage.scss';

const c = classNames.bind(STYLES);

const HomePage = ({ t }) => (
  <Page htmlTitle={'Échalo A Suerte'}>
    <TransparentPanel className={c('HomePage__container')}>
      <div className={c('HomePage__draw-chips-list')}>
        <Chip icon={randomNumber} href="/number">
          {t('random_number_title')}
        </Chip>
        <Chip icon={randomLetter} href="/letter">
          {t('random_letter_title')}
        </Chip>
        <Chip icon={rafflesIcon} href="/raffles">
          {t('raffle_section_title')}
        </Chip>
      </div>
    </TransparentPanel>
  </Page>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('HomePage')(HomePage);
