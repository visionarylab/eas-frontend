import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { GroupsResult, Participant } from 'echaloasuerte-js-sdk';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { fetchDraw } from '../../../actions/drawActions';
import Page from '../../Page/Page.jsx';
import GroupsGeneratorResult from './GroupsGeneratorResult.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import groupsOgImage from './groups_og_image.png';
import STYLES from './PublishedGroupsGeneratorPage.scss';

const c = classNames.bind(STYLES);
const analyticsDrawType = 'Groups';

const PublishedGroupsGeneratorPage = props => {
  const { draw, match, t, hostname } = props;
  const { title, description, participants, numberOfGroups, result, isLoading } = draw;
  const shareUrl = hostname + match.url;

  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page
      ogImage={groupsOgImage}
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      pageType="groups_published_draw"
      className={c('PublishedGroupsGeneratorPage')}
    >
      <DrawLayout>
        <Typography
          align="center"
          variant="h1"
          data-component="PublishedGroupsGeneratorPage__Title"
        >
          {title || t('page_title')}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
        {result.value ? (
          <ResultsBox title={t('generated_groups')}>
            <GroupsGeneratorResult result={result} />
            <br />
            <ShareButtons
              drawType={analyticsDrawType}
              sectionTitle={t('share_result')}
              url={shareUrl}
            />
          </ResultsBox>
        ) : (
          <Fragment>
            <Countdown date={result.schedule_date} />
            <ShareButtons
              drawType={analyticsDrawType}
              sectionTitle={t('share_draw')}
              url={shareUrl}
            />
          </Fragment>
        )}

        <section className={c('PublishedGroupsGeneratorPage__details')}>
          <Typography variant="h5">{t('published_draw_details')}</Typography>
          <div>
            <Typography variant="body2">
              {t('field_label_number_of_groups')}: {numberOfGroups}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">
              {t('field_label_participants')}: {participants.map(p => p.name).join(', ')}
            </Typography>
          </div>
        </section>
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

const mapsStateToProps = state => ({ draw: state.draws.draw, hostname: state.hostname.hostname });
const frontload = async props => {
  const { drawId } = props.match.params;
  await props.fetchDraw(drawId);
};

export default connect(
  mapsStateToProps,
  { fetchDraw },
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false,
  })(TranslatedPage),
);
