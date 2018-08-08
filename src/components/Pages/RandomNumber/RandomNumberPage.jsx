import React from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames/bind';
import MakeDrawPublicButton from '../../MakeDrawPublicButton/MakeDrawPublicButton';
import DrawPanel from '../../DrawPanel/DrawPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
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
        <div className={c('RandomNumberPage__results')}>{results}</div>
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
