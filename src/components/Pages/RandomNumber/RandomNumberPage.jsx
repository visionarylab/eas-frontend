import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Page from '../../Page/Page';
import RandomNumberFormContainer from './RandomNumberFormContainer';

import STYLES from './RandomNumberPage.scss';

const c = classNames.bind(STYLES);

const RandomNumberPage = props => {
  const { isPublic, results, t } = props;
  return (
    <Page htmlTitle={t('random_number_html_title')}>
      <div className={c('RandomNumberPage__container')}>
        <RandomNumberFormContainer isPublic={isPublic} onToss={props.onToss} />
        <div className={c('RandomNumberPage__results')} data-component={'RandomNumber__result'}>
          {results}
        </div>
      </div>
    </Page>
  );
};

RandomNumberPage.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.number),
  onToss: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RandomNumberPage.defaultProps = {
  results: [],
};

export default translate('RandomNumberPage')(RandomNumberPage);
