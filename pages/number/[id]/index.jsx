import React from 'react';
import PropTypes from 'prop-types';
import { logApiError } from '../../../utils/logger';
import RandomNumberPageContainer from '../../../components/Pages/RandomNumber/RandomNumberPageContainer.jsx';
import PublishedRandomNumberPage from '../../../components/Pages/RandomNumber/PublishedRandomNumberPage.jsx';
import ErrorPage from '../../../components/Pages/ErrorPage/ErrorPage.jsx';
import { analyticsTypesBySlug } from '../../../constants/analyticsTypes';
import { URL_SLUG_NUMBER } from '../../../constants/urlSlugs';
import { fetchDraw } from '../../../utils/api';
import { getTranslationFiles } from '../../../utils/draw/number';

const analyticsType = analyticsTypesBySlug[URL_SLUG_NUMBER];

const NumbersReadPage = ({ draw, error }) => {
  if (error) {
    return <ErrorPage {...error} />;
  }
  console.log('----------draw', draw);
  const { isQuickDraw } = draw;
  return isQuickDraw ? (
    <RandomNumberPageContainer draw={draw} />
  ) : (
    <PublishedRandomNumberPage draw={draw} />
  );
};

NumbersReadPage.propTypes = {
  draw: PropTypes.shape({
    isQuickDraw: PropTypes.bool.isRequired,
  }),
  error: PropTypes.shape({}),
};

NumbersReadPage.defaultProps = {
  draw: null,
  error: null,
};

NumbersReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  try {
    const draw = await fetchDraw({ urlSlug: URL_SLUG_NUMBER, drawId });
    const namespacesRequired = getTranslationFiles(draw.isQuickDraw);
    return {
      namespacesRequired,
      draw,
    };
  } catch (error) {
    logApiError(error, analyticsType);
    return {
      namespacesRequired: ['Common'],
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default NumbersReadPage;
