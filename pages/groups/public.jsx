import React from 'react';
import GroupsGeneratorPageContainer from '../../components/Pages/GroupsGenerator/GroupsGeneratorPageContainer.jsx';

const GroupsPublicLandingPage = props => <GroupsGeneratorPageContainer {...props} />;

GroupsPublicLandingPage.getInitialProps = () => ({
  namespacesRequired: ['DrawGroups', 'ParticipantsInput', 'CommonCreateDraw', 'Common'],
});

export default GroupsPublicLandingPage;
