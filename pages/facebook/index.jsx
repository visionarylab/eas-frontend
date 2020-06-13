import React from 'react';
import FacebookRafflePageContainer from '../../components/Pages/FacebookRaffle/FacebookRafflePageContainer.jsx';

const FacebookPage = props => <FacebookRafflePageContainer {...props} />;

FacebookPage.getInitialProps = async () => ({
  namespacesRequired: [
    'DrawFacebook',
    'CommonDrawRaffle',
    'ParticipantsInput',
    'PrizesInput',
    'CommonCreateDraw',
    'Common',
  ],
});

export default FacebookPage;
