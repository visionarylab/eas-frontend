import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { translate, Trans } from 'react-i18next';

import PublicDetails from '../../PublicDetails/PublicDetails';
import MakeDrawPublicButton from '../../MakeDrawPublicButton/MakeDrawPublicButton';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../DrawPanel/DrawPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import ResultsBox from '../../ResultsBox/ResultsBox';
import DrawContent from '../../DrawContent/DrawContent';
import trumpetIcon from '../../Pages/RafflePage/trumpet.png';
import ValidationTextField from '../../withValidation/ValidationTextField';
import ValidationForm from '../../withValidation/ValidationForm';
import withFormValidation from '../../withValidation/withFormValidation';
import Page from '../../Page/Page';

const ValidatedForm = withFormValidation();

const LetterDrawPage = props => {
  const { values, onFieldChange, handleToss, handlePublish, t } = props;

  return (
    <Page htmlTitle={t('raffle_html_title')}>
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <DrawPanel>
            <ValidationForm>
              <ValidationTextField
                label="label"
                placeholder="placeholder"
                value="title"
                margin="normal"
                fullWidth
                onChange={e => {}}
                inputProps={{ 'data-component': 'TitleInput' }}
                required
              />
            </ValidationForm>
          </DrawPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

LetterDrawPage.propTypes = {
  values: PropTypes.shape({
    numberOfLetters: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('LetterDrawPage')(LetterDrawPage);
