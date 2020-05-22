import React from 'react';
import PropTypes from 'prop-types';
import { GroupsApi, Groups, DrawTossPayload } from 'echaloasuerte-js-sdk';
import moment from 'moment';
import Router, { withRouter } from 'next/router';
import { logApiError } from '../../../utils/logger';
import { withTranslation } from '../../../i18n';
import GroupsGeneratorPage from './GroupsGeneratorPage.jsx';
import GroupsGeneratorQuickPage from './GroupsGeneratorQuickPage.jsx';
import withTracking from '../../../hocs/withTracking.jsx';
import recentDraws from '../../../services/recentDraws';
import throttle from '../../../services/throttle';
import { ANALYTICS_TYPE_GROUPS } from '../../../constants/analyticsTypes';

const groupsApi = new GroupsApi();

class GroupsGeneratorPageContainer extends React.Component {
  constructor(props) {
    super(props);

    const dateScheduled = new Date();
    dateScheduled.setHours(dateScheduled.getHours() + 1);

    const initialState = {
      modified: false,
      privateId: null,
      quickResult: null,
      APIError: false,
      loadingRequest: false,
      values: {
        title: '', // Default title is set in CDM
        description: '',
        participants: [],
        numberOfGroups: 2,
        dateScheduled,
      },
    };

    const { draw } = props;
    // if (draw) {
    //   const { quickResult, privateId, participants, numberOfGroups } = props.draw;
    //   initialState.quickResult = quickResult;
    //   this.state = {
    //     ...initialState,
    //     quickResult,
    //     privateId,
    //     values: {
    //       ...initialState.values,
    //       participants: participants.map(p => p.name),
    //       numberOfGroups,
    //     },
    //   };
    // } else {
    this.state = initialState;
    // }
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { t } = this.props;
    const defaultTitle = t('field_default_title');
    const { quickResult, privateId, participants, numberOfGroups } = this.props.draw;
    this.setState(previousState => ({
      values: {
        ...previousState.values,
        title: defaultTitle,
        participants: participants.map(p => p.name),
        numberOfGroups,
      },
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPrivateId = prevProps.draw?.privateId;
    const currPrivateId = this.props.draw?.privateId;
    if (this.props.draw && currPrivateId !== prevPrivateId) {
      console.log('WE GOT A NEW DRAW');
      const { quickResult, privateId, participants, numberOfGroups } = this.props.draw;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        quickResult,
        modified: false,
        loadingRequest: false,
        values: {
          participants: participants.map(p => p.name),
          numberOfGroups,
        },
      });
    }
    // console.log('prevPrivateId', prevPrivateId);
    // console.log('currPrivateId', currPrivateId);
  }

  onFieldChange = (fieldName, value) => {
    console.log('onFieldChange', fieldName, value);
    this.setState(previousState => ({
      privateId: null,
      modified: true,
      quickResult: null,
      values: {
        ...previousState.values,
        ...{
          [fieldName]: value,
        },
      },
    }));
  };

  isPublic = () => {
    const { router } = this.props;
    return router.asPath.indexOf('public') >= 0;
  };

  createDraw = () => {
    const { values } = this.state;
    const { title, description, participants, numberOfGroups } = values;
    const isPublic = this.isPublic();
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

  handleToss = async () => {
    const tsStart = new Date().getTime();
    this.setState({
      loadingRequest: true,
    });

    // await Promise(res => setTimeout(res, 1000));

    const { draw: initialDraw } = this.props;
    const { modified } = this.state;
    let privateId;

    let shouldRedirect;
    try {
      // Create a draw if there is not a previous one, or if there is but was edited
      if (initialDraw && !modified) {
        console.log('Not Created:', privateId);
        ({ privateId } = initialDraw);
      } else {
        const newDraw = await this.createDraw();
        console.log('Created:', newDraw);
        privateId = newDraw.private_id;
        shouldRedirect = true;
      }

      const tossResponse = await groupsApi.groupsToss(privateId, {});
      const { track } = this.props;
      track({
        mp: {
          name: `Toss - ${ANALYTICS_TYPE_GROUPS}`,
          properties: { drawType: ANALYTICS_TYPE_GROUPS },
        },
        ga: { action: 'Toss', category: ANALYTICS_TYPE_GROUPS },
      });
      if (shouldRedirect) {
        Router.push('/groups/[id]', `/groups/${privateId}`);
      } else {
        throttle(() => {
          this.setState({
            quickResult: tossResponse,
            APIError: false,
            loadingRequest: false,
          });
        }, tsStart);
      }
    } catch (error) {
      console.log('error', error);
      logApiError(error, ANALYTICS_TYPE_GROUPS);
      this.setState({
        APIError: true,
        loadingRequest: false,
      });
    }
  };

  handlePublish = async () => {
    this.setState({ loadingRequest: true });

    const { values } = this.state;
    try {
      const draw = await this.createDraw();
      const { dateScheduled } = values;
      const drawTossPayload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
      const tossResponse = await groupsApi.groupsToss(draw.private_id, drawTossPayload);
      const scheduleDate = moment(tossResponse.schedule_date).unix();
      const { track } = this.props;
      track({
        mp: {
          name: `Publish - ${ANALYTICS_TYPE_GROUPS}`,
          properties: { drawType: ANALYTICS_TYPE_GROUPS, drawId: draw.id },
        },
        ga: { action: 'Publish', category: ANALYTICS_TYPE_GROUPS, label: draw.id },
      });

      const drawPath = `/groups/${draw.id}/success`;
      recentDraws.add(draw, drawPath, scheduleDate);
      Router.push('/groups/[id]/success', drawPath);
    } catch (err) {
      this.setState({ APIError: true, loadingRequest: false });
    }
  };

  handleCheckErrorsInConfiguration = t => {
    const { values } = this.state;
    const { participants, numberOfGroups } = values;
    if (participants.length < numberOfGroups) {
      return t('error_form_not_enough_participants', { numberOfGroups });
    }
    return undefined;
  };

  render() {
    let { quickResult } = this.state;
    let values;
    const { modified } = this.state;

    if (modified) {
      console.log('values from state', values);
      ({ quickResult, values } = this.state);
    } else if (this.props.draw) {
      console.log('values from props', values);
      const { participants, numberOfGroups } = this.props.draw;
      ({ quickResult } = this.props.draw);
      values = {
        participants: participants.map(p => p.name),
        numberOfGroups,
      };
    }

    // if (!quickResult) {
    //   console.log('result from state', values);
    //   ({ quickResult, values } = this.state);
    // } else if (this.props.draw) {
    //   console.log('result from props', values);
    //   const { participants, numberOfGroups } = this.props.draw;
    //   ({ quickResult } = this.props.draw);
    //   values = {
    //     participants: participants.map(p => p.name),
    //     numberOfGroups,
    //   };
    // }

    const { APIError, loadingRequest } = this.state;
    return this.isPublic() ? (
      <GroupsGeneratorPage
        apiError={APIError}
        loadingRequest={loadingRequest}
        values={values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
        handleCheckErrorsInConfiguration={this.handleCheckErrorsInConfiguration}
      />
    ) : (
      <GroupsGeneratorQuickPage
        apiError={APIError}
        loadingRequest={loadingRequest}
        values={values}
        quickResult={quickResult}
        onFieldChange={this.onFieldChange}
        handleToss={this.handleToss}
        handleCheckErrorsInConfiguration={this.handleCheckErrorsInConfiguration}
      />
    );
  }
}

GroupsGeneratorPageContainer.propTypes = {
  draw: PropTypes.shape({
    privateId: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        facebook_id: PropTypes.string,
      }),
    ).isRequired,
    numberOfGroups: PropTypes.number,
    quickResult: PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
    }),
  }),
  track: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
};
GroupsGeneratorPageContainer.defaultProps = {
  draw: null,
};

export default withRouter(
  withTracking(withTranslation('DrawGroups')(GroupsGeneratorPageContainer)),
);
