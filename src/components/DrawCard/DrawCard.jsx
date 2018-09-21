import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames/bind';

import STYLES from './DrawCard.scss';

const c = classNames.bind(STYLES);

const ExternalLink = ({ children, ...rest }) => <a {...rest}>{children}</a>;

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const DrawCard = props => {
  const LinkComponent = props.to ? Link : ExternalLink;
  return (
    <LinkComponent className={c('DrawCard__link')} to={props.to} href={props.externalHref}>
      <Paper className={c('DrawCard')}>
        <img className={c('DrawCard__icon')} src={props.icon} alt={props.children} />
        <Typography className={c('DrawCard__title')} variant="subheading">
          {props.children}
        </Typography>
      </Paper>
    </LinkComponent>
  );
};

DrawCard.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  externalHref: PropTypes.string,
  to: PropTypes.string,
};

DrawCard.defaultProps = {
  externalHref: undefined,
  to: undefined,
};
export default DrawCard;
