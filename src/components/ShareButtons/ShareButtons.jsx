import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SocialShareButton from './SocialShareButton.jsx';

const availableShareButtons = ['facebook', 'twitter', 'telegram', 'whatsapp', 'email'];

const ShareButtons = ({ sectionTitle, url, types }) => (
  <div>
    {sectionTitle && (
      <Typography variant="subtitle2" align="center">
        {sectionTitle}
      </Typography>
    )}
    {types
      .filter(type => availableShareButtons.includes(type))
      .map(type => (
        <SocialShareButton key={type} url={url} type={type} />
      ))}
  </div>
);

ShareButtons.propTypes = {
  sectionTitle: PropTypes.string,
  url: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string),
};
ShareButtons.defaultProps = {
  sectionTitle: '',
  types: availableShareButtons,
};

export default ShareButtons;
