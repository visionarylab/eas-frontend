import React from 'react';
import RandomLetterPageContainer from '../../../components/Pages/RandomLetter/RandomLetterPageContainer.jsx';
import PublishedRandomLetterPage from '../../../components/Pages/RandomLetter/PublishedRandomLetterPage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import { URL_SLUG_LETTER } from '../../../constants/urlSlugs';
import getInitialProps from '../../../utils/getInitialProps';

const LettersReadPage = props => (
  <ReadPage
    {...props}
    MainPage={RandomLetterPageContainer}
    PublishedPage={PublishedRandomLetterPage}
  />
);

LettersReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_LETTER });
};

export default LettersReadPage;
