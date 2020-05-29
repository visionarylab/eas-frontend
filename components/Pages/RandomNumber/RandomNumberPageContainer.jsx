import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { RandomNumberApi, RandomNumber, DrawTossPayload } from 'echaloasuerte-js-sdk';
import moment from 'moment';
import { withTranslation } from '../../../i18n';
import RandomNumberPage from './RandomNumberPage.jsx';
import { logApiError } from '../../../utils/logger';
import RandomNumberQuickPage from './RandomNumberQuickPage.jsx';
import throttle from '../../../services/throttle';
import withTracking from '../../../hocs/withTracking.jsx';
import recentDraws from '../../../services/recentDraws';
import { ANALYTICS_TYPE_NUMBER } from '../../../constants/analyticsTypes';

const randomNumberApi = new RandomNumberApi();

const getInitialValues = (previousDraw, t) => {
  const dateScheduled = new Date();
  dateScheduled.setHours(dateScheduled.getHours() + 1);
  const initialValues = {
    title: t('field_default_title'),
    description: '',
    rangeMin: previousDraw?.rangeMin || '1',
    rangeMax: previousDraw?.rangeMax || '10',
    numberOfResults: previousDraw?.numberOfResults || '1',
    allowRepeated: previousDraw?.allowRepeated || false,
    dateScheduled,
  };
  return initialValues;
};
const getInitialPrivateId = previousDraw => previousDraw?.privateId;
const getInitialQuickResult = previousDraw => previousDraw?.lastResult;
const initialLoadingRequest = false;
const initialApiError = false;

const RandomNumberPageContainer = props => {
  const { draw: previousDraw, track, t } = props;

  const [privateId, setPrivateId] = useState(getInitialPrivateId(previousDraw));
  const [values, setValues] = useState(getInitialValues(previousDraw, t));
  const [quickResult, setQuickResult] = useState(getInitialQuickResult(previousDraw));
  const [APIError, setAPIError] = useState(initialApiError);
  const [loadingRequest, setLoadingRequest] = useState(initialLoadingRequest);
  const router = useRouter();

  const isPublic = router.asPath.includes('public');

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
    const { title, description, rangeMin, rangeMax, numberOfResults, allowRepeated } = values;
    const drawData = {
      range_min: rangeMin,
      range_max: rangeMax,
      number_of_results: numberOfResults,
      allow_repeated_results: allowRepeated,
      title: isPublic && title ? title : null,
      description: isPublic && description ? description : null,
      metadata: [{ client: 'web', key: 'isQuickDraw', value: !isPublic }],
    };
    const randomNumberDraw = RandomNumber.constructFromObject(drawData);
    return randomNumberApi.randomNumberCreate(randomNumberDraw);
  };

  const handleToss = async () => {
    const tsStart = new Date().getTime();
    setLoadingRequest(true);

    let shouldRedirect;
    let privateIdToToss;
    try {
      if (!privateId) {
        const newDraw = await createDraw();
        shouldRedirect = true;
        privateIdToToss = newDraw.private_id;
      } else {
        privateIdToToss = privateId;
      }

      const tossResponse = await randomNumberApi.randomNumberToss(privateIdToToss, {});
      track({
        mp: {
          name: `Toss - ${ANALYTICS_TYPE_NUMBER}`,
          properties: { drawType: ANALYTICS_TYPE_NUMBER },
        },
        ga: { action: 'Toss', category: ANALYTICS_TYPE_NUMBER },
      });
      throttle(() => {
        if (shouldRedirect) {
          Router.push('/number/[id]', `/number/${privateIdToToss}`);
        } else {
          setAPIError(false);
          setLoadingRequest(false);
          setQuickResult(tossResponse);
        }
      }, tsStart);
    } catch (error) {
      logApiError(error, ANALYTICS_TYPE_NUMBER);
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
      const tossResponse = await randomNumberApi.randomNumberToss(
        newDraw.private_id,
        drawTossPayload,
      );
      const scheduleDate = moment(tossResponse.schedule_date).unix();
      track({
        mp: {
          name: `Publish - ${ANALYTICS_TYPE_NUMBER}`,
          properties: { drawType: ANALYTICS_TYPE_NUMBER, drawId: newDraw.id },
        },
        ga: { action: 'Publish', category: ANALYTICS_TYPE_NUMBER, label: newDraw.id },
      });

      const drawPath = `/number/${newDraw.id}/success`;
      recentDraws.add(newDraw, drawPath, scheduleDate);
      Router.push('/number/[id]/success', drawPath);
    } catch (err) {
      setAPIError(true);
      setLoadingRequest(false);
    }
  };

  const handleCheckErrorsInConfiguration = () => {
    const rangeMin = parseInt(values.rangeMin, 10);
    const rangeMax = parseInt(values.rangeMax, 10);
    const numberOfResults = parseInt(values.numberOfResults, 10);
    if (rangeMin >= rangeMax) {
      return t('error_form_invalid_ranges', {
        min: values.rangeMin,
        max: values.rangeMax,
      });
    }
    if (!values.allowRepeated && numberOfResults > rangeMax - rangeMin) {
      return t('error_form_range_not_big_enough');
    }
    return undefined;
  };

  return isPublic ? (
    <RandomNumberPage
      apiError={APIError}
      loadingRequest={loadingRequest}
      values={values}
      onFieldChange={onFieldChange}
      handlePublish={handlePublish}
      handleCheckErrorsInConfiguration={handleCheckErrorsInConfiguration}
    />
  ) : (
    <RandomNumberQuickPage
      apiError={APIError}
      loadingRequest={loadingRequest}
      values={values}
      quickResult={quickResult}
      onFieldChange={onFieldChange}
      handleToss={handleToss}
      handleCheckErrorsInConfiguration={handleCheckErrorsInConfiguration}
    />
  );
};

RandomNumberPageContainer.propTypes = {
  draw: PropTypes.shape({
    privateId: PropTypes.string.isRequired,
    rangeMax: PropTypes.string.isRequired,
    rangeMin: PropTypes.string.isRequired,
    numberOfResults: PropTypes.string.isRequired,
    allowRepeated: PropTypes.bool.isRequired,
    quickResult: PropTypes.shape(),
  }),
  track: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RandomNumberPageContainer.defaultProps = {
  draw: null,
};

export default withTracking(withTranslation('DrawNumber')(RandomNumberPageContainer));
