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
  MainPage: PropTypes.elementType,
  PublishedPage: PropTypes.elementType,
};

ReadPage.defaultProps = {
  draw: null,
  error: null,
  MainPage: null,
  PublishedPage: null,
};

export default ReadPage;
