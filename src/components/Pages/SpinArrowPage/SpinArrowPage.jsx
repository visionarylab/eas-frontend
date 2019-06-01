import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import classnames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';

import Page from '../../Page/Page.jsx';
import STYLES from './SpinArrowPage.scss';
import ArrowImage from './arrow.svg';
import arrowOgImage from './arrow_og_image.png';

const c = classnames.bind(STYLES);

const SpinArrowPage = ({ angle, animate, handleToss, t }) => {
  const arrowCss = {
    transform: `rotate(${angle}deg)`,
  };
  if (!animate) {
    arrowCss.transition = 'none';
  }

  return (
    <Page
      htmlTitle={t('html_title')}
      htmlDescription={t('html_description')}
      htmlKeywords={t('html_keywords')}
      pageType="spin_arrow_draw"
      ogImage={arrowOgImage}
      className={c('SpinArrowPage')}
    >
      <Typography variant="h1">{t('page_title')}</Typography>
      <Typography variant="subtitle1">{t('draw_subheading')}</Typography>

      <div className={c('SpinArrowPage__container')}>
        <button type="button" className={c('SpinArrowPage__button')} onClick={handleToss}>
          <img
            className={c('SpinArrowPage__arrow')}
            style={arrowCss}
            src={ArrowImage}
            data-testid="SpinArrow__arrow"
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

export default withTranslation('SpinArrow')(SpinArrowPage);
