import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import classNames from 'classnames/bind';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import i18n from 'i18next';

import config from '../../config/config';
import logo from '../Header/logo_vector2.svg';
import STYLES from './Page.scss';

const c = classNames.bind(STYLES);

class Page extends Component {
  constructor(props) {
    super(props);

    const page = props.location.pathname;
    // ReactGA.pageview(page);
  }

  getMetaTags() {
    const { htmlTitle, htmlDescription, noIndex } = this.props;
    const shouldIndexPage = config.indexPages && !noIndex;
    const theTitle = htmlTitle.substring(0, 60);
    const theDescription = htmlDescription.substring(0, 155);
    // const theImage = defaultImage;

    const metaTags = [
      // { itemprop: 'name', content: theTitle },
      // { itemprop: 'description', content: theDescription },
      // { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      // { name: 'twitter:image:src', content: theImage },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: 'website' },
      // { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:image', content: logo },
      { property: 'og:description', content: theDescription },
      // { property: 'og:site_name', content: defaultTitle },
      // { property: 'fb:app_id', content: FACEBOOK_APP_ID },
    ];

    if (!shouldIndexPage) {
      metaTags.push({ name: 'robots', content: 'noindex' });
    }

    return metaTags;
  }

  render() {
    const { htmlTitle, className, location, children } = this.props;
    return (
      <Fragment>
        <Helmet
          title={htmlTitle}
          htmlAttributes={{
            lang: i18n.language,
            itemtype: 'http://schema.org/WebPage',
          }}
          // link={[
          //   {
          //     rel: 'canonical',
          //     href: window.location.origin + location.pathname,
          //   },
          // ]}
          meta={this.getMetaTags()}
        >
          {/* <meta property="og:title" content="Mark's Favorites at AEO" /> */}
          {/* <meta property="og:image" content={logo} /> */}
          {/* <meta name="description" content={htmlDescription} /> */}
          {/* {!shouldIndexPage && <meta name="robots" content="noindex" />} */}
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
