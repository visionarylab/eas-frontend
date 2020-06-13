import React from 'react';
import PublishedFacebookRafflePage from '../../../components/Pages/FacebookRaffle/PublishedFacebookRafflePage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import getInitialProps from '../../../utils/getInitialProps';
import FacebookProvider from '../../../hocs/FacebookProvider.jsx';
import { URL_SLUG_FACEBOOK } from '../../../constants/urlSlugs';

const FacebookRaffleReadPage = props => (
  <FacebookProvider>
    <ReadPage {...props} PublishedPage={PublishedFacebookRafflePage} />
  </FacebookProvider>
);

FacebookRaffleReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_FACEBOOK });
};

export default FacebookRaffleReadPage;
