import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import { GroupsResult, Participant } from 'echaloasuerte-js-sdk';

import Page from '../../Page/Page.jsx';
import GroupsGeneratorResult from './GroupsGeneratorResult.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
// import ShareButtons from '../../ShareButtons/ShareButtons.jsx';
import DrawLayout from '../../DrawLayout/DrawLayout.jsx';
import STYLES from './PublishedGroupsGeneratorPage.scss';

const c = classNames.bind(STYLES);

const PublishedGroupsGeneratorPage = props => {
  const {
    title,
    result,
    isOwner,
    participants,
    shareUrl, // eslint-disable-line no-unused-vars
    numberOfGroups,
    description,
    onToss,
    isLoading,
    t,
  } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      htmlKeywords={t('html_keywords')}
      noIndex
      className={c('PublishedGroupsGeneratorPage')}
    >
      <DrawLayout>
        <Typography variant="h1" data-component="PublishedGroupsGeneratorPage__Title">
          {title || t('page_title')}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
        {result.value ? (
          <ResultsBox title={t('generated_groups')}>
            <GroupsGeneratorResult result={result} />
            <br />
            {/* <ShareButtons sectionTitle={t('share_result')} url={shareUrl} /> */}
          </ResultsBox>
        ) : (
          <Fragment>
            <Countdown date={result.schedule_date} />
            {isOwner && <Button type="submit" onClick={onToss} />}
            {/* <ShareButtons sectionTitle={t('share_result')} url={shareUrl} /> */}
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
  title: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
  numberOfGroups: PropTypes.number,
  description: PropTypes.string,
  result: PropTypes.instanceOf(GroupsResult),
  shareUrl: PropTypes.string.isRequired,
  isOwner: PropTypes.bool,
  isLoading: PropTypes.bool,
  onToss: PropTypes.func,
  t: PropTypes.func.isRequired,
};

PublishedGroupsGeneratorPage.defaultProps = {
  title: '',
  description: '',
  result: [],
  numberOfGroups: null,
  isOwner: false,
  isLoading: false,
  onToss: () => {},
};

export default translate('GroupsGenerator')(PublishedGroupsGeneratorPage);
