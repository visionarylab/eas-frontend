import React from 'react';
import PropTypes from 'prop-types';
import { RandomNumberApi } from 'echaloasuerte-js-sdk';
import { logApiError } from '../../../utils/logger';
import RandomNumberPageContainer from '../../../components/Pages/RandomNumber/RandomNumberPageContainer.jsx';
import PublishedRandomNumberPage from '../../../components/Pages/RandomNumber/PublishedRandomNumberPage.jsx';
import ErrorPage from '../../../components/Pages/ErrorPage/ErrorPage.jsx';
import { ANALYTICS_TYPE_NUMBER } from '../../../constants/analyticsTypes';

const NumbersReadPage = ({ draw, error }) => {
  if (error) {
    return <ErrorPage {...error} />;
  }
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
  }).isRequired,
  error: PropTypes.shape({}),
};

NumbersReadPage.defaultProps = {
  error: null,
};

const randomNumberApi = new RandomNumberApi();

const loadData = async drawId => {
  const draw = await randomNumberApi.randomNumberRead(drawId);
  const {
    private_id: privateId,
    title,
    description,
    range_min,
    range_max,
    number_of_results,
    allow_repeated_results: allowRepeated,
    results,
    metadata,
  } = draw;
  const rangeMin = range_min.toString();
  const rangeMax = range_max.toString();
  const numberOfResults = number_of_results.toString();
  const lastResult = results[0];
  const isQuickDrawData = metadata.find(item => item.key === 'isQuickDraw');
  const isQuickDraw = isQuickDrawData ? isQuickDrawData.value === 'true' : false;

  if (isQuickDraw) {
    return {
      privateId,
      rangeMin,
      rangeMax,
      numberOfResults,
      allowRepeated,
      lastResult,
      isQuickDraw,
    };
  }

  return {
    title,
    description,
    rangeMin,
    rangeMax,
    numberOfResults,
    allowRepeated,
    result: lastResult,
    isOwner: Boolean(privateId),
    isQuickDraw,
  };
};

NumbersReadPage.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  try {
    const draw = await loadData(drawId);
    const commonNamespaces = ['DrawNumber', 'Common'];
    let namespacesRequired;
    if (draw.isQuickDraw) {
      namespacesRequired = [...commonNamespaces];
    } else {
      namespacesRequired = [...commonNamespaces, 'CommonPublishedDraw'];
    }
    return {
      namespacesRequired,
      draw,
    };
  } catch (error) {
    logApiError(error, ANALYTICS_TYPE_NUMBER);
    return {
      namespacesRequired: ['Common'],
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default NumbersReadPage;
