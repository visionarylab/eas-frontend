import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Public from 'material-ui-icons/Public';
import { translate } from 'react-i18next';

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
