import React from 'react';
import RafflePageContainer from '../../components/Pages/Raffle/RafflePageContainer.jsx';

const RafflePage = props => <RafflePageContainer {...props} />;

RafflePage.getInitialProps = () => ({
  namespacesRequired: [
    'DrawRaffle',
    'ParticipantsInput',
    'PrizesInput',
    'CommonCreateDraw',
    'Common',
  ],
});

export default RafflePage;
