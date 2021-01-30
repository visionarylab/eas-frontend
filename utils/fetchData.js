import { fetchDraw } from './api';
import { logApiError } from './logger';

import { analyticsTypesBySlug } from '../constants/analyticsTypes';

const serializeResponse = draw => JSON.parse(JSON.stringify(draw));

const fetchData = async ({ drawId, urlSlug, req }) => {
  try {
    // getServerSideProps does a strict serialization which fails when serialising Date
    // By doing stringify & parse we make sure that dates are strings and not Date objects
    // https://github.com/vercel/next.js/issues/11993#issuecomment-617937409
    const draw = serializeResponse(await fetchDraw({ urlSlug, drawId }));
    return {
      draw,
    };
  } catch (error) {
    const analyticsType = analyticsTypesBySlug[urlSlug];
    const extra = { drawType: analyticsType, drawId };
    logApiError(error, extra);
    return {
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default fetchData;
