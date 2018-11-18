import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import classNames from 'classnames/bind';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';

import config from '../../config/config';
import logo from '../Header/logo_vector2.svg';
import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

class Page extends Component {
  constructor(props) {
    super(props);

    const page = props.location.pathname;
    ReactGA.pageview(page);
  }

  render() {
    const { htmlTitle, htmlDescription, noIndex, className, children } = this.props;
    const shouldIndexPage = config.indexPages && !noIndex;
    return (
      <Fragment>
        <Helmet>
          <title>{htmlTitle}</title>
          <meta property="og:title" content="Mark's Favorites at AEO" />
          <meta property="og:image" content={logo} />
          <meta name="description" content={htmlDescription} />
          {!shouldIndexPage && <meta name="robots" content="noindex" />}
        </Helmet>
        <div className={c('Page', className)}>{children}</div>
      </Fragment>
    );
  }
}

Page.propTypes = {
  htmlTitle: PropTypes.string.isRequired,
  htmlDescription: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  noIndex: PropTypes.bool,
  location: ReactRouterPropTypes.location.isRequired,
};

Page.defaultProps = {
  className: null,
  noIndex: false,
};

export default withRouter(Page);
