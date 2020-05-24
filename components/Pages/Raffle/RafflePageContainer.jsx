import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RaffleApi, Raffle, DrawTossPayload } from 'echaloasuerte-js-sdk';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { withTranslation } from '../../../i18n';
import withTracking from '../../../hocs/withTracking.jsx';
import { logApiError } from '../../../utils/logger';
import recentDraws from '../../../services/recentDraws';
import throttle from '../../../services/throttle';
import RafflePage from './RafflePage.jsx';
import RaffleQuickPage from './RaffleQuickPage.jsx';
import { ANALYTICS_TYPE_RAFFLE } from '../../../constants/analyticsTypes';

const raffleApi = new RaffleApi();

const getInitialValues = (previousDraw, t) => {
  const dateScheduled = new Date();
  dateScheduled.setHours(dateScheduled.getHours() + 1);
  const initialValues = {
    title: t('field_default_title'),
    description: '',
    participants: previousDraw?.participants || [],
    prizes: previousDraw?.prizes || [],
    dateScheduled,
  };
  return initialValues;
};
const getInitialPrivateId = previousDraw => previousDraw?.privateId;
const getInitialQuickResult = previousDraw => previousDraw?.lastResult;
const initialLoadingRequest = false;
const initialApiError = false;

const RafflePageContainer = props => {
  const { draw: previousDraw, t } = props;

  const [privateId, setPrivateId] = useState(getInitialPrivateId(previousDraw));
  const [values, setValues] = useState(getInitialValues(previousDraw, t));
  const [quickResult, setQuickResult] = useState(getInitialQuickResult(previousDraw));
  const [APIError, setAPIError] = useState(initialApiError);
  const [loadingRequest, setLoadingRequest] = useState(initialLoadingRequest);
  const router = useRouter();

  const isPublic = router.asPath.includes('public');

  // When the users toss multiple times they get redirected but we can not rely on `useState`
  // setting the initial value there
  useEffect(() => {
    setQuickResult(getInitialQuickResult(previousDraw));
    setPrivateId(getInitialPrivateId(previousDraw));
    setLoadingRequest(initialLoadingRequest);
    setAPIError(initialApiError);
    setValues(getInitialValues(previousDraw, t));
  }, [previousDraw, t]);

  const onFieldChange = (fieldName, value) => {
    setQuickResult(null);
    setPrivateId(null);
    setValues(previousState => ({
      ...previousState,
      [fieldName]: value,
    }));
  };

  const createDraw = () => {
    const { title, description, participants, prizes } = values;
    const drawData = {
      prizes: prizes.map(prize => ({ name: prize })),
      participants: participants.map(participant => ({ name: participant })),
      title: isPublic && title ? title : null,
      description: isPublic && description ? description : null,
      metadata: [{ client: 'web', key: 'isQuickDraw', value: !isPublic }],
    };
    const raffleDraw = Raffle.constructFromObject(drawData);
    return raffleApi.raffleCreate(raffleDraw);
  };

  const handleToss = async () => {
    const tsStart = new Date().getTime();
    setLoadingRequest(true);

    let shouldRedirect;
    let privateIdToToss;
    try {
      // Create the draw only if it wasn't created in a previous toss
      if (!privateId) {
        const newDraw = await createDraw();
        shouldRedirect = true;
        privateIdToToss = newDraw.private_id;
      } else {
        privateIdToToss = privateId;
      }

      const tossResponse = await raffleApi.raffleToss(privateIdToToss, {});
      const { track } = props;
      track({
        mp: {
          name: `Toss - ${ANALYTICS_TYPE_RAFFLE}`,
          properties: { drawType: ANALYTICS_TYPE_RAFFLE },
        },
        ga: { action: 'Toss', category: ANALYTICS_TYPE_RAFFLE },
      });
      throttle(() => {
        if (shouldRedirect) {
          Router.push('/raffle/[id]', `/raffle/${privateIdToToss}`);
        } else {
          setAPIError(false);
          setLoadingRequest(false);
          setQuickResult(tossResponse);
        }
      }, tsStart);
    } catch (error) {
      logApiError(error, ANALYTICS_TYPE_RAFFLE);
      setAPIError(true);
      setLoadingRequest(false);
    }
  };

  const handlePublish = async () => {
    setLoadingRequest(true);

    try {
      const newDraw = await createDraw();
      const { dateScheduled } = values;
      const drawTossPayload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
      const tossResponse = await raffleApi.raffleToss(newDraw.private_id, drawTossPayload);
      const scheduleDate = moment(tossResponse.schedule_date).unix();
      const { track } = props;
      track({
        mp: {
          name: `Publish - ${ANALYTICS_TYPE_RAFFLE}`,
          properties: { drawType: ANALYTICS_TYPE_RAFFLE, drawId: newDraw.id },
        },
        ga: { action: 'Publish', category: ANALYTICS_TYPE_RAFFLE, label: newDraw.id },
      });
      const drawPath = `/raffle/${newDraw.id}/success`;
      recentDraws.add(newDraw, drawPath, scheduleDate);
      Router.push(`/raffle/[id]/success`, drawPath);
    } catch (err) {
      setAPIError(true);
      setLoadingRequest(false);
    }
  };

  const handleCheckErrorsInConfiguration = () => {
    const { participants, prizes } = values;
    const numberOfPrizes = prizes.length;
    const numOfParticipants = participants.length;
    if (numOfParticipants < numberOfPrizes) {
      return t('error_form_not_enough_participants', { numberOfPrizes, count: numOfParticipants });
    }
    return undefined;
  };

  return isPublic ? (
    <RafflePage
      apiError={APIError}
      loadingRequest={loadingRequest}
      values={values}
      onFieldChange={onFieldChange}
      handlePublish={handlePublish}
      handleCheckErrorsInConfiguration={handleCheckErrorsInConfiguration}
    />
  ) : (
    <RaffleQuickPage
      apiError={APIError}
      values={values}
      quickResult={quickResult}
      loadingRequest={loadingRequest}
      handleToss={handleToss}
      onFieldChange={onFieldChange}
      handleCheckErrorsInConfiguration={handleCheckErrorsInConfiguration}
    />
  );
};

RafflePageContainer.propTypes = {
  draw: PropTypes.shape({
    privateId: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    quickResult: PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
    }),
  }),
  t: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
};

RafflePageContainer.defaultProps = {
  draw: null,
};

export default withTracking(withTranslation('DrawRaffle')(RafflePageContainer));
