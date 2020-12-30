import React from 'react';
import PublishedFacebookRafflePage from '../../../components/Pages/FacebookRaffle/PublishedFacebookRafflePage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import fetchData from '../../../utils/fetchData';
import FacebookProvider from '../../../hocs/FacebookProvider.jsx';
import { URL_SLUG_FACEBOOK } from '../../../constants/urlSlugs';

const FacebookRaffleReadPage = props => (
  <FacebookProvider>
    <ReadPage {...props} PublishedPage={PublishedFacebookRafflePage} />
  </FacebookProvider>
);

export const getServerSideProps = async ctx => {
  const { id: drawId } = ctx.query;
  const props = await fetchData({ drawId, urlSlug: URL_SLUG_FACEBOOK });
  return { props };
};

export default FacebookRaffleReadPage;
