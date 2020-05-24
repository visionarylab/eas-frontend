import React from 'react';
import GroupsGeneratorPageContainer from '../../components/Pages/GroupsGenerator/GroupsGeneratorPageContainer.jsx';

const GroupsLandingPage = props => <GroupsGeneratorPageContainer {...props} />;

GroupsLandingPage.getInitialProps = () => ({
  namespacesRequired: ['DrawGroups', 'ParticipantsInput', 'CommonCreateDraw', 'Common'],
});

export default GroupsLandingPage;
