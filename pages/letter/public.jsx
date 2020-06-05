import React from 'react';
import RandomLetterPageContainer from '../../components/Pages/RandomLetter/RandomLetterPageContainer.jsx';

const LettersCreatePage = props => <RandomLetterPageContainer {...props} />;

LettersCreatePage.getInitialProps = () => ({
  namespacesRequired: ['DrawLetter', 'CommonCreateDraw', 'Common'],
});

export default LettersCreatePage;
