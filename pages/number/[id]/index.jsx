import React from 'react';
import RandomNumberPageContainer from '../../../components/Pages/RandomNumber/RandomNumberPageContainer.jsx';
import PublishedRandomNumberPage from '../../../components/Pages/RandomNumber/PublishedRandomNumberPage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import getInitialProps from '../../../utils/getInitialProps';

import { URL_SLUG_NUMBER } from '../../../constants/urlSlugs';

const NumbersReadPage = props => (
  <ReadPage
    {...props}
    MainPage={RandomNumberPageContainer}
    PublishedPage={PublishedRandomNumberPage}
  />
);

NumbersReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_NUMBER });
};

export default NumbersReadPage;
