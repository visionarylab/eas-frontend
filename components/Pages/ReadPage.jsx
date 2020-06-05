import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage/ErrorPage.jsx';

const ReadPage = ({ draw, error, PublishedPage, MainPage }) => {
  if (error) {
    return <ErrorPage {...error} />;
  }
  const { isQuickDraw } = draw;
  return isQuickDraw ? <MainPage draw={draw} /> : <PublishedPage draw={draw} />;
};

ReadPage.propTypes = {
  draw: PropTypes.shape({
    isQuickDraw: PropTypes.bool.isRequired,
  }),
  error: PropTypes.shape({}),
  MainPage: PropTypes.elementType.isRequired,
  PublishedPage: PropTypes.elementType.isRequired,
};

ReadPage.defaultProps = {
  draw: null,
  error: null,
};

export default ReadPage;
