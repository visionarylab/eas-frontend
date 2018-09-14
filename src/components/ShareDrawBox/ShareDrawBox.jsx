import React from 'react';
import PropTypes from 'prop-types';

const ShareDrawBox = ({ shareLink }) => <div>{shareLink}</div>;

ShareDrawBox.propTypes = {
  shareLink: PropTypes.string.isRequired,
};

export default ShareDrawBox;
