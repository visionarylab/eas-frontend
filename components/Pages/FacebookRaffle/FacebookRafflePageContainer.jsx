import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '../../../i18n';
import FacebookRafflePage from './FacebookRafflePage.jsx';
import withTracking from '../../../hocs/withTracking.jsx';
import { publish } from '../../../utils/api';
import { URL_SLUG_FACEBOOK } from '../../../constants/urlSlugs';

const urlSlug = URL_SLUG_FACEBOOK;

const getInitialValues = t => {
  const dateScheduled = new Date();
  dateScheduled.setHours(dateScheduled.getHours() + 1);
  const initialValues = {
    title: t('field_default_title'),
    description: '',
    participants: [],
    prizes: [],
    dateScheduled,
  };
  return initialValues;
};
const initialLoadingRequest = false;
const initialApiError = false;

const FacebookRafflePageContainer = props => {
  const { t, track } = props;

  const [values, setValues] = useState(getInitialValues(t));
  const [APIError, setAPIError] = useState(initialApiError);
  const [loadingRequest, setLoadingRequest] = useState(initialLoadingRequest);

  const onFieldChange = (fieldName, value) => {
    setValues(previousState => ({
      ...previousState,
      [fieldName]: value,
    }));
  };

  const handlePublish = () => {
    publish({
      values,
      urlSlug,
      track,
      setLoadingRequest,
      setAPIError,
    });
  };

  return (
    <FacebookRafflePage
      apiError={APIError}
      loadingRequest={loadingRequest}
      values={values}
      onFieldChange={onFieldChange}
      handlePublish={handlePublish}
    />
  );
};

FacebookRafflePageContainer.propTypes = {
  t: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
};

export default withTracking(withTranslation('DrawFacebook')(FacebookRafflePageContainer));
