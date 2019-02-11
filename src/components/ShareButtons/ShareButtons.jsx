import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames/bind';
import SocialShareButton from './SocialShareButton.jsx';
import STYLES from './ShareButtons.scss';

const c = classnames.bind(STYLES);

const availableShareButtons = ['facebook', 'twitter', 'telegram', 'whatsapp', 'email'];

const ShareButtons = ({ sectionTitle, url, types }) => (
  <div className={c('ShareButtons')}>
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
  types: ['facebook', 'twitter', 'telegram', 'whatsapp'],
};

export default ShareButtons;
