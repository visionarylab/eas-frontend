import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GroupsApi, Groups, DrawTossPayload } from 'echaloasuerte-js-sdk';

import GroupsGeneratorPage from './GroupsGeneratorPage.jsx';
import GroupsGeneratorQuickPage from './GroupsGeneratorQuickPage.jsx';
import withTracking from '../../withTracking/withTracking.jsx';

const groupsApi = new GroupsApi();
class GroupsGeneratorPageContainer extends React.Component {
  constructor(props) {
    super(props);

    const dateScheduled = new Date();
    dateScheduled.setHours(dateScheduled.getHours() + 1);

    this.state = {
      privateId: null,
      quickResult: null,
      APIError: false,
      values: {
        title: 'Sorteo de grupos aleatorios',
        description: '',
        participants: [],
        numberOfGroups: '2',
        dateScheduled,
      },
    };
  }

  onFieldChange = (fieldName, value) => {
    this.setState(previousState => ({
      privateId: null,
      quickResult: null,
      values: {
        ...previousState.values,
        ...{
          [fieldName]: value,
        },
      },
    }));
  };

  createDraw = () => {
    const { match } = this.props;
    const { isPublic } = match.params;
    const { values } = this.state;
    const { title, description, participants, numberOfGroups } = values;
    const drawData = {
      participants: participants.map(participant => ({ name: participant })),
      number_of_groups: numberOfGroups,
      title: isPublic && title ? title : null,
      description: isPublic && description ? description : null,
    };
    const groupGeneratorDraw = Groups.constructFromObject(drawData);
    return groupsApi.groupsCreate(groupGeneratorDraw);
  };

  handleToss = async () => {
    this.setState({ loadingResult: true });

    const randomNumberOfSeconds = Math.floor(Math.random() * 2.5) + 1.5;
    setTimeout(() => this.setState({ loadingResult: false }), randomNumberOfSeconds * 1000);
    let { privateId } = this.state;
    try {
      // Create the draw only if it wasn't created in a previous toss
      if (!privateId) {
        const draw = await this.createDraw();
        privateId = draw.private_id;
        this.setState({ privateId });
      }

      const tossResponse = await groupsApi.groupsToss(privateId, {});
      const { track } = this.props;
      track({
        mp: { name: 'Toss', properties: { drawType: 'Groups Draw' } },
        ga: { action: 'Toss', category: 'Groups Draw' },
      });
      this.setState({ quickResult: tossResponse, APIError: false });
    } catch (err) {
      this.setState({ APIError: true });
    }
  };

  handlePublish = async () => {
    const { /* match, */ history } = this.props;
    const { values } = this.state;
    try {
      const draw = await this.createDraw();

      const { dateScheduled } = values;
      const drawTossPayload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
      await groupsApi.groupsToss(draw.private_id, drawTossPayload);

      const { track } = this.props;
      track({
        mp: { name: 'Publish', properties: { drawType: 'Groups', drawId: draw.id } },
        ga: { action: 'Publish', category: 'Groups Draw', label: draw.id },
      });

      // const drawPathname = match.url.replace('public', draw.private_id);
      const drawPathname = `/groups/${draw.id}`;
      history.push(drawPathname);
    } catch (err) {
      this.setState({ APIError: true });
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
    const { APIError, values, quickResult, loadingResult } = this.state;
    const { match } = this.props;
    const { isPublic } = match.params;

    return isPublic ? (
      <GroupsGeneratorPage
        apiError={APIError}
        values={values}
        onFieldChange={this.onFieldChange}
        handlePublish={this.handlePublish}
        handleCheckErrorsInConfiguration={this.handleCheckErrorsInConfiguration}
      />
    ) : (
      <GroupsGeneratorQuickPage
        apiError={APIError}
        loadingResult={loadingResult}
        values={values}
        onFieldChange={this.onFieldChange}
        handleCheckErrorsInConfiguration={this.handleCheckErrorsInConfiguration}
        quickResult={quickResult}
        handleToss={this.handleToss}
      />
    );
  }
}

GroupsGeneratorPageContainer.propTypes = {
  track: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
GroupsGeneratorPageContainer.defaultProps = {};

export default withTracking(GroupsGeneratorPageContainer);
