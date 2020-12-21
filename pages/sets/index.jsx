import React from 'react';
import LinkSetsPageContainer from '../../components/Pages/LinkSets/LinkSetsPageContainer.jsx';

const LinkSetsPage = props => <LinkSetsPageContainer {...props} />;

LinkSetsPage.getInitialProps = () => ({
  namespacesRequired: ['DrawLinkSets', 'CommonCreateDraw', 'Common'],
});

export default LinkSetsPage;
