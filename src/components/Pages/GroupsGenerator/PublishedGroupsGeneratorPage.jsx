import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';

import Page from '../../Page/Page';
import GroupsGeneratorResult from './GroupsGeneratorResult';
import ResultsBox from '../../ResultsBox/ResultsBox';
import BannerAlert, { ALERT_TYPES } from '../../BannerAlert/BannerAlert';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { getDate, getTime } from '../../../services/datetime';
import Countdown from '../../Countdown/Countdown';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
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
  return (
    <Page htmlTitle={title} noIndex>
      <div className={c('PublishedGroupsGeneratorPage__content')}>
        {title && (
          <div>
            <Typography
              variant="display2"
              align={'center'}
              data-component={'PublishedGroupsGeneratorPage__Title'}
            >
              {title}
            </Typography>
          </div>
        )}
        {result.value ? (
          <ResultsBox title={t('generated_groups')}>
            <GroupsGeneratorResult result={result.value} />
          </ResultsBox>
        ) : (
          <div>
            <Countdown date={result.schedule_date} />
            {isOwner && <SubmitButton label={t('generate_resuts')} onClick={onToss} />}
          </div>
        )}
        <section className={c('PublishedGroupsGeneratorPage__details')}>
          <div>
            <Typography variant="display1">{t('published_draw_details')}</Typography>
            {description && <Typography variant="body1">{description}</Typography>}
            <div>
              {t('field_label_number_of_groups')}: {numberOfGroups}
            </div>
            <div>
              {t('field_label_participants')}: {participants.map(p => p.name).join(', ')}
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

PublishedGroupsGeneratorPage.propTypes = {
  title: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfGroups: PropTypes.number.isRequired,
  description: PropTypes.string,
  result: PropTypes.arrayOf(PropTypes.object),
  isOwner: PropTypes.bool,
  isLoading: PropTypes.bool,
  onToss: PropTypes.func,
  t: PropTypes.func.isRequired,
};

PublishedGroupsGeneratorPage.defaultProps = {
  title: '',
  description: '',
  result: [],
  isOwner: false,
  isLoading: false,
  onToss: () => {},
};

export default translate('GroupsGenerator')(PublishedGroupsGeneratorPage);
