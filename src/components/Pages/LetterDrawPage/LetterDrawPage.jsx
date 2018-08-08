import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { translate, Trans } from 'react-i18next';

import Wizard from '../../Wizard/Wizard';
import withFormValidation from '../../withValidation/withFormValidation';
import Page from '../../Page/Page';

const ValidatedForm = withFormValidation();

const LetterDrawPage = props => {
  const { values, onFieldChange, handleToss, handlePublish, t } = props;
  const steps = [
    {
      label: 'Detalles generales',
      content: <div>asd</div>,
    },
    {
      label: 'Elegir participantes',
      content: <div>asd</div>,
    },
    {
      label: 'Cuándo se realizara el sorteo?',
      content: <div>asd</div>,
    },
  ];
  return (
    <Page htmlTitle={t('raffle_html_title')}>
      <Wizard steps={steps} />
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
