import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Public from '@material-ui/icons/Public';

const MakeDrawPublicButton = ({ handleMakeDrawPublic, t }) => (
  <Button variant="raised" color="primary" onClick={handleMakeDrawPublic}>
    <Public />
    {t('make_public')}
  </Button>
);

MakeDrawPublicButton.propTypes = {
  handleMakeDrawPublic: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('MakeDrawPublicButton')(MakeDrawPublicButton);
