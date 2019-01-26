import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import moment from 'moment';
import { GroupsResult, Participant } from 'echaloasuerte-js-sdk';
import i18n from '../../../i18n/i18n';
import Page from '../../Page/Page.jsx';
import GroupsGeneratorResult from './GroupsGeneratorResult.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import TransparentBox from '../../TransparentBox/TransparentBox.jsx';
import STYLES from './PublishedGroupsGeneratorPage.scss';

const c = classNames.bind(STYLES);

const PublishedGroupsGeneratorPage = props => {
  const {
    title,
    result,
    isOwner,
    participants,
    numberOfGroups,
    description,
    onToss,
    isLoading,
    t,
  } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  moment.locale(i18n.language);
  return (
    <Page
      htmlTitle={title || t('html_title')}
      htmlDescription={description || t('html_description')}
      noIndex
      className={c('PublishedGroupsGeneratorPage')}
    >
      <TransparentBox center>
        <Typography variant="h1" data-component="PublishedGroupsGeneratorPage__Title">
          {title || t('page_title')}
        </Typography>
        {result.value ? (
          <ResultsBox title={t('generated_groups')}>
            <GroupsGeneratorResult result={result} />
          </ResultsBox>
        ) : (
          <div>
            <Tooltip title={moment(result.schedule_date).format()}>
              <Typography variant="subtitle1">
                {t('results_published_on')} {moment(result.schedule_date).format('LLL')}
              </Typography>
            </Tooltip>
            <Countdown date={result.schedule_date} />
            {isOwner && (
              <Button type="submit" onClick={onToss}>
                {'secret toss'}
              </Button>
            )}
          </div>
        )}
        <section className={c('PublishedGroupsGeneratorPage__details')}>
          <Typography variant="h5">{t('published_draw_details')}</Typography>
          {description && <Typography variant="body2">{description}</Typography>}
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
      </TransparentBox>
    </Page>
  );
};

PublishedGroupsGeneratorPage.propTypes = {
  title: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.instanceOf(Participant)).isRequired,
  numberOfGroups: PropTypes.number,
  description: PropTypes.string,
  result: PropTypes.instanceOf(GroupsResult),
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
