import React from 'react';
import RecentDraws from '../components/Pages/RecentDraws/RecentDrawsPage.jsx';

const Recent = props => <RecentDraws {...props} />;

Recent.getInitialProps = () => ({
  namespacesRequired: ['RecentDraws', 'Common'],
});

export default Recent;
