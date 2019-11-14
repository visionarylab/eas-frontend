import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import { GroupsResult, Participant } from 'echaloasuerte-js-sdk';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import useLoadDataAfterCountdown from '../../../hooks/useLoadDataAfterCountdown';
import { fetchDraw } from '../../../actions/drawActions';
import Page from '../../Page/Page.jsx';
import GroupsGeneratorResult from './GroupsGeneratorResult.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import PublishedDrawDetails from '../../PublishedDrawDetails/PublishedDrawDetails.jsx';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import DrawHeading from '../../DrawHeading/DrawHeading.jsx';
import groupsOgImage from './groups_og_image.png';

const analyticsDrawType = 'Groups';

const loadData = async props => {
  const { drawId } = props.match.params;
  await props.fetchDraw(drawId);
};

const PublishedGroupsGeneratorPage = props => {
  const { draw, match, t, hostname } = props;
  const { title, description, participants, numberOfGroups, result, isLoading } = draw;
  const shareUrl = hostname + match.url;

  useLoadDataAfterCountdown(result, () => loadData(props));

  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }

  const ShareButtonsList = () => (
    <ShareButtons drawType={analyticsDrawType} sectionTitle={t('share_result')} url={shareUrl} />
  );
  return (
    <Page
      ogImage={groupsOgImage}
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      pageType="Groups Published Draw"
    >
      <DrawLayout>
        <DrawHeading title={title || t('page_title')} subtitle={description} />
        {result.value ? (
          <ResultsBox title={t('generated_groups')}>
            <GroupsGeneratorResult result={result} />
          </ResultsBox>
        ) : (
          <Countdown date={result.schedule_date} />
        )}
        <ShareButtonsList />
        <PublishedDrawDetails sectionTitle={t('published_draw_details')}>
          <Typography component="div" variant="body2">
            {t('label_number_of_groups')} {numberOfGroups}
          </Typography>
          <Typography component="div" variant="body2">
            {t('label_participants')} {participants.map(p => p.name).join(', ')}
          </Typography>
        </PublishedDrawDetails>
      </DrawLayout>
    </Page>
  );
};

PublishedGroupsGeneratorPage.propTypes = {
  draw: PropTypes.shape({
    title: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
    numberOfGroups: PropTypes.number,
    description: PropTypes.string,
    result: PropTypes.instanceOf(GroupsResult),
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
  }).isRequired,
  hostname: PropTypes.string.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  t: PropTypes.func.isRequired,
};

PublishedGroupsGeneratorPage.defaultProps = {};

const TranslatedPage = withTranslation('GroupsGenerator')(PublishedGroupsGeneratorPage);

const mapsStateToProps = state => ({
  draw: state.draws.draw,
  hostname: state.userRequest.hostname,
});

export default connect(
  mapsStateToProps,
  { fetchDraw },
)(
  frontloadConnect(loadData, {
    onMount: true,
    onUpdate: false,
  })(TranslatedPage),
);
