import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GroupsApi } from 'echaloasuerte-js-sdk';

import PublishedGroupsGeneratorPage from './PublishedGroupsGeneratorPage.jsx';
import config from '../../../config/config';

const groupsApi = new GroupsApi();

class PublishedGroupsGeneratorPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      participants: [],
      numberOfGroups: null,
      result: null,
      isOwner: false,
      isLoading: true,
      shareUrl: '',
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  onToss = async () => {
    const { match } = this.props;
    const { drawId } = match.params;
    try {
      await groupsApi.groupsToss(drawId, {});
      this.loadData();
    } catch (err) {
      alert(err);
    }
  };

  async loadData() {
    const { match } = this.props;
    const { drawId } = match.params;

    const draw = await groupsApi.groupsRead(drawId);
    const {
      private_id: privateId,
      title,
      description,
      participants,
      number_of_groups: numberOfGroups,
    } = draw;
    const lastToss = draw.results[0];
    const scheduleDate = lastToss.schedule_date;
    const shareUrl = config.domain + match.url;

    if (scheduleDate > Date.now()) {
      const milisecondsMissing = scheduleDate - Date.now();
      setTimeout(() => {
        this.loadData();
      }, milisecondsMissing);
    }

    this.setState({
      title,
      description,
      participants,
      numberOfGroups,
      result: lastToss,
      isOwner: Boolean(privateId),
      isLoading: false,
      shareUrl,
    });
  }

  render() {
    const {
      title,
      description,
      participants,
      numberOfGroups,
      result,
      isOwner,
      isLoading,
      shareUrl,
    } = this.state;

    return (
      <PublishedGroupsGeneratorPage
        title={title}
        description={description}
        participants={participants}
        numberOfGroups={numberOfGroups}
        result={result}
        isOwner={isOwner}
        isLoading={isLoading}
        shareUrl={shareUrl}
      />
    );
  }
}

PublishedGroupsGeneratorPageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PublishedGroupsGeneratorPageContainer;
