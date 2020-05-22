import { GroupsApi } from 'echaloasuerte-js-sdk';
import React from 'react';
import PropTypes from 'prop-types';
import { logApiError } from '../../../utils/logger';
import GroupsGeneratorPageContainer from '../../../components/Pages/GroupsGenerator/GroupsGeneratorPageContainer.jsx';
import PublishedGroupsGeneratorPage from '../../../components/Pages/GroupsGenerator/PublishedGroupsGeneratorPage.jsx';
import { ANALYTICS_TYPE_GROUPS } from '../../../constants/analyticsTypes';
import ErrorPage from '../../../components/Pages/ErrorPage/ErrorPage.jsx';

const Groups = ({ draw, error }) => {
  if (error) {
    return <ErrorPage {...error} />;
  }
  const { isQuickDraw } = draw;
  return isQuickDraw ? (
    <GroupsGeneratorPageContainer draw={draw} />
  ) : (
    <PublishedGroupsGeneratorPage draw={draw} />
  );
};

Groups.propTypes = {
  draw: PropTypes.shape({
    isQuickDraw: PropTypes.bool.isRequired,
  }).isRequired,
  error: PropTypes.shape({}),
};

Groups.defaultProps = {
  error: null,
};

const groupsApi = new GroupsApi();

const loadData = async drawId => {
  const draw = await groupsApi.groupsRead(drawId);
  const {
    id,
    private_id: privateId,
    title,
    description,
    participants,
    number_of_groups: numberOfGroups,
    results,
    metadata,
  } = draw;
  const lastToss = results[0];
  const isQuickDrawData = metadata.find(item => item.key === 'isQuickDraw');
  const isQuickDraw = isQuickDrawData ? isQuickDrawData.value === 'true' : false;

  if (isQuickDraw) {
    return {
      privateId,
      participants,
      numberOfGroups,
      quickResult: lastToss,
      isQuickDraw,
    };
  }

  return {
    id,
    privateId,
    title,
    description,
    participants,
    numberOfGroups,
    result: lastToss,
    isOwner: Boolean(privateId),
    isQuickDraw,
  };
};

Groups.getInitialProps = async ctx => {
  const { id: drawId } = ctx.query;
  try {
    const draw = await loadData(drawId);
    const commonNamespaces = ['DrawGroups', 'Common'];
    let namespacesRequired;
    if (draw.isQuickDraw) {
      namespacesRequired = [...commonNamespaces, 'ParticipantsInput', 'CommonCreateDraw'];
    } else {
      namespacesRequired = [...commonNamespaces, 'CommonPublishedDraw'];
    }
    return {
      namespacesRequired,
      draw,
    };
  } catch (error) {
    logApiError(error, ANALYTICS_TYPE_GROUPS);
    return {
      namespacesRequired: [],
      error: {
        statusCode: error.status || 500,
      },
    };
  }
};

export default Groups;
