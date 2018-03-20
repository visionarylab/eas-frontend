import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Public from 'material-ui-icons/Public';
import { translate } from 'react-translate';

const MakeDrawPublicButton = ({ handleMakeDrawPublic, t }) => (
  <Button raised color="primary" onClick={handleMakeDrawPublic}>
    <Public />
    {t('make_public')}
  </Button>
);

MakeDrawPublicButton.propTypes = {
  handleMakeDrawPublic: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('MakeDrawPublicButton')(MakeDrawPublicButton);
