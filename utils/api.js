import { RandomNumberApi, RandomNumber, DrawTossPayload } from 'echaloasuerte-js-sdk';
import Router from 'next/router';
import throttle from '../services/throttle';
import { logApiError } from './logger';
import recentDraws from '../services/recentDraws';
import { getDrawDataFromValues } from './draw';

import { analyticsTypesBySlug } from '../constants/analyticsTypes';

const apiToss = (urlSlug, privateId, payload = {}) => {
  switch (urlSlug) {
    case 'number':
      return new RandomNumberApi().randomNumberToss(privateId, payload);
    default:
      return null;
  }
};

const apiCreate = (urlSlug, drawData) => {
  switch (urlSlug) {
    case 'number': {
      const randomNumberDraw = RandomNumber.constructFromObject(drawData);
      return new RandomNumberApi().randomNumberCreate(randomNumberDraw);
    }
    default:
      return null;
  }
};

// Publishing a draw is just tossing with a scheduledDate
const apiPublish = (urlSlug, privateId, dateScheduled) => {
  const payload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
  return apiToss(urlSlug, privateId, payload);
};

// eslint-disable-next-line import/prefer-default-export
export const toss = async ({
  values,
  privateId,
  urlSlug,
  setLoadingRequest,
  track,
  setAPIError,
  setQuickResult,
}) => {
  const analyticsType = analyticsTypesBySlug[urlSlug];
  const tsStart = new Date().getTime();
  setLoadingRequest(true);

  let shouldRedirect;
  let privateIdToToss;
  try {
    if (!privateId) {
      const drawData = getDrawDataFromValues({ urlSlug, values, isPublic: false });
      const newDraw = await apiCreate(urlSlug, drawData);
      shouldRedirect = true;
      privateIdToToss = newDraw.private_id;
    } else {
      privateIdToToss = privateId;
    }

    const tossResponse = await apiToss(urlSlug, privateIdToToss);
    track({
      mp: {
        name: `Toss - ${analyticsType}`,
        properties: { drawType: analyticsType },
      },
      ga: { action: 'Toss', category: analyticsType },
    });
    throttle(() => {
      if (shouldRedirect) {
        Router.push(`/${urlSlug}/[id]`, `/${urlSlug}/${privateIdToToss}`);
      } else {
        setAPIError(false);
        setLoadingRequest(false);
        setQuickResult(tossResponse);
      }
    }, tsStart);
  } catch (error) {
    logApiError(error, analyticsType);
    setAPIError(true);
    setLoadingRequest(false);
  }
};

export const publish = async ({ values, urlSlug, track, setLoadingRequest, setAPIError }) => {
  setLoadingRequest(true);
  const analyticsType = analyticsTypesBySlug[urlSlug];
  const { dateScheduled } = values;

  try {
    const drawData = getDrawDataFromValues({ urlSlug, values, isPublic: true });
    const newDraw = await apiCreate(urlSlug, drawData);
    await apiPublish(urlSlug, newDraw.private_id, dateScheduled);
    track({
      mp: {
        name: `Publish - ${analyticsType}`,
        properties: { drawType: analyticsType, drawId: newDraw.id },
      },
      ga: { action: 'Publish', category: analyticsType, label: newDraw.id },
    });

    const drawPath = `/number/${newDraw.id}/success`;
    recentDraws.add(newDraw, drawPath, dateScheduled);
    Router.push('/number/[id]/success', drawPath);
  } catch (error) {
    logApiError(error, analyticsType);
    setAPIError(true);
    setLoadingRequest(false);
  }
};
