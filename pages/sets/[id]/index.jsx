import React from 'react';
import LinkSetsPageContainer from '../../../components/Pages/LinkSets/LinkSetsPageContainer.jsx';
import PublishedLinkSetsPage from '../../../components/Pages/LinkSets/PublishedLinkSetsPage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import getInitialProps from '../../../utils/getInitialProps';

import { URL_SLUG_SETS } from '../../../constants/urlSlugs';

const LinkSetsReadPage = props => (
  <ReadPage {...props} MainPage={LinkSetsPageContainer} PublishedPage={PublishedLinkSetsPage} />
);

LinkSetsReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_SETS });
};

export default LinkSetsReadPage;
