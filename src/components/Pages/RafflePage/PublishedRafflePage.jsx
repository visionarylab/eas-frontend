import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import { RaffleResult } from 'echaloasuerte-js-sdk';
import Page from '../../Page/Page.jsx';
import PrizesOverview from '../../PrizesOverview/PrizesOverview.jsx';
import WinnersList from '../../WinnersList/WinnersList.jsx';
import ResultsBox from '../../ResultsBox/ResultsBox.jsx';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import Countdown from '../../Countdown/Countdown.jsx';
import STYLES from './PublishedRafflePage.scss';

const c = classNames.bind(STYLES);

const PublishedRafflePage = props => {
  const { isLoading, title, prizes, result, description, participants, isOwner, onToss, t } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page htmlTitle={title} noIndex className={c('PublishedRafflePage')}>
      <Typography variant="h1" align="center" data-component="PublishedRafflePage__Title">
        {title}
      </Typography>
      {result.value ? (
        <ResultsBox title={t('section_title_winners')}>
          <WinnersList winners={result.value} />
        </ResultsBox>
      ) : (
        <Fragment>
          <PrizesOverview prizes={prizes} />
          <Countdown date={result.schedule_date} />
          {isOwner && (
            <Button type="submit" onClick={onToss}>
              {' '}
            </Button>
          )}
        </Fragment>
      )}
      <section className={c('PublishedRafflePage__details')}>
        <div>
          <Typography variant="h5">{t('published_draw_details')}</Typography>
          {description && <Typography variant="body2">{description}</Typography>}
          <div>
            <Typography variant="body2">
              {t('field_label_number_of_participants')}: {participants.length}
            </Typography>
          </div>
        </div>
      </section>
    </Page>
  );
};

PublishedRafflePage.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  result: PropTypes.instanceOf(RaffleResult),
  isOwner: PropTypes.bool,
  onToss: PropTypes.func,

  t: PropTypes.func.isRequired,
};

PublishedRafflePage.defaultProps = {
  isLoading: false,
  isOwner: false,
  result: null,
  onToss: () => {},
};

export default withTranslation('Raffle')(PublishedRafflePage);
