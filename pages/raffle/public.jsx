import React from 'react';
import RafflePageContainer from '../../components/Pages/Raffle/RafflePageContainer.jsx';

const RafflePublicPage = props => <RafflePageContainer {...props} />;

RafflePublicPage.getInitialProps = () => ({
  namespacesRequired: [
    'DrawRaffle',
    'CommonDrawRaffle',
    'ParticipantsInput',
    'PrizesInput',
    'CommonCreateDraw',
    'Common',
  ],
});

export default RafflePublicPage;
