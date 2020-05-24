import { RaffleApi } from 'echaloasuerte-js-sdk';
import React from 'react';
import PropTypes from 'prop-types';
import { ANALYTICS_TYPE_RAFFLE } from '../../../constants/analyticsTypes';
import ErrorPage from '../../../components/Pages/ErrorPage/ErrorPage.jsx';
import { logApiError } from '../../../utils/logger';
import PublishedRafflePage from '../../../components/Pages/Raffle/PublishedRafflePage.jsx';
import RafflePageContainer from '../../../components/Pages/Raffle/RafflePageContainer.jsx';

const raffleApi = new RaffleApi();

const Raffle = ({ draw, error }) => {
  if (error) {
    return <ErrorPage {...error} />;
  }
  const { isQuickDraw } = draw;
  return isQuickDraw ? <RafflePageContainer draw={draw} /> : <PublishedRafflePage draw={draw} />;
};

Raffle.propTypes = {
  draw: PropTypes.shape({
    isQuickDraw: PropTypes.bool.isRequired,
  }).isRequired,
  error: PropTypes.shape({}),
};

Raffle.defaultProps = {
  error: null,
};

const loadData = async drawId => {
  const draw = await raffleApi.raffleRead(drawId);
  const {
    id,
    private_id: privateId,
    title,
    description,
    participants: participantsObjects,
    prizes: prizesObjects,
    results,
    metadata,
  } = draw;
  const lastResult = results[0];
  const isQuickDrawData = metadata.find(item => item.key === 'isQuickDraw');
  const isQuickDraw = isQuickDrawData ? isQuickDrawData.value === 'true' : false;
  const participants = participantsObjects.map(participant => participant.name);
  const prizes = prizesObjects.map(prize => prize.name);

  if (isQuickDraw) {
    return {
      privateId,
      participants,
      prizes,
      lastResult,
      isQuickDraw,
    };
  }

  return {
    id,
    title,
    description,
    participants,
    prizes,
    result: lastResult,
    isOwner: Boolean(privateId),
    isQuickDraw,
  };
};

Raffle.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  try {
    const draw = await loadData(drawId);
    const commonNamespaces = ['DrawRaffle', 'Common'];
    let namespacesRequired;
    if (draw.isQuickDraw) {
      namespacesRequired = [
        ...commonNamespaces,
        'ParticipantsInput',
        'PrizesInput',
        'CommonCreateDraw',
      ];
    } else {
      namespacesRequired = [...commonNamespaces, 'CommonPublishedDraw'];
    }
    return {
      namespacesRequired,
      draw,
    };
  } catch (error) {
    logApiError(error, ANALYTICS_TYPE_RAFFLE);
    return {
      namespacesRequired: ['Common'],
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default Raffle;
