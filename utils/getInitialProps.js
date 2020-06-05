import { fetchDraw } from './api';
import { logApiError } from './logger';
import { getTranslationFiles } from './draw';

import { analyticsTypesBySlug } from '../constants/analyticsTypes';

const getInitialProps = async ({ drawId, urlSlug }) => {
  try {
    const draw = await fetchDraw({ urlSlug, drawId });
    const { isQuickDraw } = draw;
    const namespacesRequired = getTranslationFiles({ urlSlug, isQuickDraw });
    return {
      namespacesRequired,
      draw,
    };
  } catch (error) {
    const analyticsType = analyticsTypesBySlug[urlSlug];
    logApiError(error, analyticsType);
    return {
      namespacesRequired: ['Common'],
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default getInitialProps;
