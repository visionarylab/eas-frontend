import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classnames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';

import Page from '../../Page/Page';
import STYLES from './SpinArrowPage.scss';
import ArrowImage from './arrow.svg';
import anotherIcon from '../../Pages/HomePage/random_letter.png';

const c = classnames.bind(STYLES);

const SpinArrowPage = ({ angle, animate, handleToss, t }) => {
  const arrowCss = {
    transform: `rotate(${angle}deg)`,
  };
  if (!animate) {
    arrowCss.transition = 'none';
  }

  return (
    <Page htmlTitle={t('spin_arrow_html_tittle')} className={c('SpinArrowPage')}>
      <Typography color="primary" variant="display1">
        {t('spin_arrow_title')}
      </Typography>
      <Typography variant="subheading">{t('click_the_arrow_to_spin_it')}</Typography>

      {/* <button className={c('SpinArrowPage__container')} style={arrowCss} onClick={handleToss} /> */}
      <div className={c('SpinArrowPage__container')}>
        <button className={c('SpinArrowPage__button')} onClick={handleToss}>
          <img
            className={c('SpinArrowPage__arrow')}
            style={arrowCss}
            src={ArrowImage}
            alt="Arrow"
          />
        </button>
      </div>
    </Page>
  );
};

SpinArrowPage.propTypes = {
  angle: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  handleToss: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

SpinArrowPage.defaultProps = {
  animate: true,
};

export default translate('SpinArrowPage')(SpinArrowPage);
