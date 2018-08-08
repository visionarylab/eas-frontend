import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import Page from '../../Page/Page';
import RaffleFormContainer from './RaffleFormContainer';

import STYLES from './RafflePage.scss';

const c = classNames.bind(STYLES);

const RafflePage = props => {
  const { t } = props;
  return (
    <Page htmlTitle={t('raffle_html_title')}>
      <div className={c('RafflePage__container')}>
        <RaffleFormContainer />
      </div>
    </Page>
  );
};

RafflePage.propTypes = {
  t: PropTypes.func.isRequired,
};

RafflePage.defaultPropTypes = {};

export default translate('RafflePage')(RafflePage);
