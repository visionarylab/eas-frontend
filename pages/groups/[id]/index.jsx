import React from 'react';
import GroupsGeneratorPageContainer from '../../../components/Pages/GroupsGenerator/GroupsGeneratorPageContainer.jsx';
import PublishedGroupsGeneratorPage from '../../../components/Pages/GroupsGenerator/PublishedGroupsGeneratorPage.jsx';
import ReadPage from '../../../components/Pages/ReadPage.jsx';
import getInitialProps from '../../../utils/getInitialProps';
import { URL_SLUG_GROUPS } from '../../../constants/urlSlugs';

const GroupsReadPage = props => (
  <ReadPage
    {...props}
    MainPage={GroupsGeneratorPageContainer}
    PublishedPage={PublishedGroupsGeneratorPage}
  />
);

GroupsReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  return getInitialProps({ drawId, urlSlug: URL_SLUG_GROUPS });
};

export default GroupsReadPage;
