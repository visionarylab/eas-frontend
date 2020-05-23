import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GroupsApi, Groups, DrawTossPayload } from 'echaloasuerte-js-sdk';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { logApiError } from '../../../utils/logger';
import { withTranslation } from '../../../i18n';
import GroupsGeneratorPage from './GroupsGeneratorPage.jsx';
import GroupsGeneratorQuickPage from './GroupsGeneratorQuickPage.jsx';
import withTracking from '../../../hocs/withTracking.jsx';
import recentDraws from '../../../services/recentDraws';
import throttle from '../../../services/throttle';
import { ANALYTICS_TYPE_GROUPS } from '../../../constants/analyticsTypes';

const groupsApi = new GroupsApi();

const getInitialValues = (previousDraw, t) => {
  const dateScheduled = new Date();
  dateScheduled.setHours(dateScheduled.getHours() + 1);
  const initialValues = {
    title: t('field_default_title'),
    description: '',
    participants: previousDraw?.participants || [],
    numberOfGroups: previousDraw?.numberOfGroups || 2,
    dateScheduled,
  };
  return initialValues;
};
const getInitialPrivateId = previousDraw => previousDraw?.privateId;
const getInitialQuickResult = previousDraw => previousDraw?.lastResult;
const initialLoadingRequest = false;
const initialApiError = false;

const GroupsGeneratorPageContainer = props => {
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
    const { title, description, participants, numberOfGroups } = values;
    const drawData = {
      participants: participants.map(participant => ({ name: participant })),
      number_of_groups: numberOfGroups,
      title: isPublic && title ? title : null,
      description: isPublic && description ? description : null,
      metadata: [{ client: 'web', key: 'isQuickDraw', value: !isPublic }],
    };
    const groupGeneratorDraw = Groups.constructFromObject(drawData);
    return groupsApi.groupsCreate(groupGeneratorDraw);
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

      const tossResponse = await groupsApi.groupsToss(privateIdToToss, {});
      const { track } = props;
      track({
        mp: {
          name: `Toss - ${ANALYTICS_TYPE_GROUPS}`,
          properties: { drawType: ANALYTICS_TYPE_GROUPS },
        },
        ga: { action: 'Toss', category: ANALYTICS_TYPE_GROUPS },
      });
      throttle(() => {
        if (shouldRedirect) {
          Router.push('/groups/[id]', `/groups/${privateIdToToss}`);
        } else {
          setAPIError(false);
          setLoadingRequest(false);
          setQuickResult(tossResponse);
        }
      }, tsStart);
    } catch (error) {
      logApiError(error, ANALYTICS_TYPE_GROUPS);
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
      const tossResponse = await groupsApi.groupsToss(newDraw.private_id, drawTossPayload);
      const scheduleDate = moment(tossResponse.schedule_date).unix();
      const { track } = props;
      track({
        mp: {
          name: `Publish - ${ANALYTICS_TYPE_GROUPS}`,
          properties: { drawType: ANALYTICS_TYPE_GROUPS, drawId: newDraw.id },
        },
        ga: { action: 'Publish', category: ANALYTICS_TYPE_GROUPS, label: newDraw.id },
      });

      const drawPath = `/groups/${newDraw.id}/success`;
      recentDraws.add(newDraw, drawPath, scheduleDate);
      Router.push('/groups/[id]/success', drawPath);
    } catch (err) {
      setAPIError(true);
      setLoadingRequest(false);
    }
  };

  const handleCheckErrorsInConfiguration = () => {
    const { participants, numberOfGroups } = values;
    if (participants.length < numberOfGroups) {
      return t('error_form_not_enough_participants', { numberOfGroups });
    }
    return undefined;
  };
  return isPublic ? (
    <GroupsGeneratorPage
      apiError={APIError}
      loadingRequest={loadingRequest}
      values={values}
      onFieldChange={onFieldChange}
      handlePublish={handlePublish}
      handleCheckErrorsInConfiguration={handleCheckErrorsInConfiguration}
    />
  ) : (
    <GroupsGeneratorQuickPage
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

GroupsGeneratorPageContainer.propTypes = {
  draw: PropTypes.shape({
    privateId: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfGroups: PropTypes.number,
    quickResult: PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
    }),
  }),
  track: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
GroupsGeneratorPageContainer.defaultProps = {
  draw: null,
};

export default withTracking(withTranslation('DrawGroups')(GroupsGeneratorPageContainer));
