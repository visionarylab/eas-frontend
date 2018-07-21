import React from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames/bind';

import PublicDetails from '../../PublicDetails/PublicDetails';
import MakeDrawPublicButton from '../../MakeDrawPublicButton/MakeDrawPublicButton';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../DrawPanel/DrawPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import SubmitButton from '../../SubmitButton/SubmitButton';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';
import RandomNumberFormContainer from './RandomNumberFormContainer';

import STYLES from './RandomNumberPage.scss';

const c = classNames.bind(STYLES);

const RandomNumberPage = props => {
  const { isPublic, results, t } = props;
  return (
    <Page htmlTitle={t('random_number_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <RandomNumberFormContainer isPublic={isPublic} onToss={props.onToss} />
            <div className={c('RandomNumberPage__results')}>{results}</div>
          </DrawPanel>
        </Grid>

        <Grid item xs={3}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="number_draw_seo_description">
                Create this draw publicly so everyone can see the results at the same time
              </Trans>
            </Paper>
            <MakeDrawPublicButton handleMakeDrawPublic={props.handleMakeDrawPublic} />
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

RandomNumberPage.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.number),
  handleMakeDrawPublic: PropTypes.func.isRequired,
  onToss: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RandomNumberPage.defaultProps = {
  results: [],
};

export default translate('RandomNumberPage')(RandomNumberPage);
