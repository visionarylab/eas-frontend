import React from 'react';
import RandomLetterPageContainer from '../../components/Pages/RandomLetter/RandomLetterPageContainer.jsx';

const LetterPage = props => <RandomLetterPageContainer {...props} />;

LetterPage.getInitialProps = () => ({
  namespacesRequired: ['DrawNumber', 'CommonCreateDraw', 'Common'],
});

export default LetterPage;
