import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

import classnames from 'classnames/bind';
import STYLES from './SocialShareButton.scss';

const c = classnames.bind(STYLES);

const SocialButton = ({ url, type, size, className }) => {
  const buttonProps = { url, className };
  switch (type) {
    case 'whatsapp':
      return (
        <WhatsappShareButton {...buttonProps}>
          <WhatsappIcon size={size} />
        </WhatsappShareButton>
      );
    case 'facebook':
      return (
        <FacebookShareButton {...buttonProps}>
          <FacebookIcon size={size} />
        </FacebookShareButton>
      );
    case 'twitter':
      return (
        <TwitterShareButton {...buttonProps}>
          <TwitterIcon size={size} />
        </TwitterShareButton>
      );

    case 'telegram':
      return (
        <TelegramShareButton {...buttonProps}>
          <TelegramIcon size={size} />
        </TelegramShareButton>
      );
    case 'email':
      return (
        <EmailShareButton {...buttonProps}>
          <EmailIcon size={size} />
        </EmailShareButton>
      );
    default:
      return null;
  }
};

SocialButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string.isRequired,
};

SocialButton.defaultProps = {
  size: 32,
};

const SocialShareButton = ({ url, type }) => (
  <SocialButton url={url} type={type} className={c('SocialShareButton')} />
);

SocialShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SocialShareButton;
