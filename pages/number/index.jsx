import React from 'react';
import RandomNumberPageContainer from '../../components/Pages/RandomNumber/RandomNumberPageContainer.jsx';

const NumberPage = props => <RandomNumberPageContainer {...props} />;

NumberPage.getInitialProps = () => ({
  namespacesRequired: ['DrawNumber', 'CommonCreateDraw', 'Common'],
});

export default NumberPage;
