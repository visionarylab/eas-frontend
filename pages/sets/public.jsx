import React from 'react';
import LinkSetsPageContainer from '../../components/Pages/LinkSets/LinkSetsPageContainer.jsx';

const LinkSetsCreatePage = props => <LinkSetsPageContainer {...props} />;

LinkSetsCreatePage.getInitialProps = () => ({
  namespacesRequired: ['DrawLinkSets', 'CommonCreateDraw', 'Common'],
});

export default LinkSetsCreatePage;
