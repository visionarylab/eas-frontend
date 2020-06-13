import React from 'react';
import PublishedRafflePage from '../../../components/Pages/Raffle/PublishedRafflePage.jsx';
import RafflePageContainer from '../../../components/Pages/Raffle/RafflePageContainer.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import getInitialProps from '../../../utils/getInitialProps';

import { URL_SLUG_RAFFLE } from '../../../constants/urlSlugs';

const RaffleReadPage = props => (
  <ReadPage {...props} MainPage={RafflePageContainer} PublishedPage={PublishedRafflePage} />
);

RaffleReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_RAFFLE });
};

export default RaffleReadPage;
