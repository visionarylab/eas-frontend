import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import { RaffleResult } from 'echaloasuerte-js-sdk';
import Page from '../../Page/Page';
import PrizesOverview from '../../PrizesOverview/PrizesOverview';
import WinnersList from '../../WinnersList/WinnersList';
import ResultsBox from '../../ResultsBox/ResultsBox';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Countdown from '../../Countdown/Countdown';
import STYLES from './PublishedRafflePage.scss';

const c = classNames.bind(STYLES);

const PublishedRafflePage = props => {
  const {
    isLoading,
    title,
    prizes,
    result,
    description,
    participants,
    numberOfWinners,
    isOwner,
    onToss,
    t,
  } = props;
  if (isLoading) {
    return <LoadingSpinner fullpage />;
  }
  return (
    <Page htmlTitle={title} noIndex className={c('PublishedRafflePage')}>
      <Typography variant="h1" align={'center'} data-component={'PublishedRandomNumberPage__Title'}>
        {title}
      </Typography>
      {result.value ? (
        <ResultsBox title={t('generated_numbers')}>
          <WinnersList winners={result.value} />
        </ResultsBox>
      ) : (
        <Fragment>
          <PrizesOverview prizes={prizes} />
          <Countdown date={result.schedule_date} />
          {isOwner && <Button type="submit" onClick={onToss} />}
        </Fragment>
      )}
      <section className={c('PublishedRandomNumberPage__details')}>
        <div>
          <Typography variant="h5">{t('published_draw_details')}</Typography>
          {description && (
            <p>
              <Typography variant="body2">{description}</Typography>
            </p>
          )}
          <div>
            <Typography variant="body2">
              {t('field_label_number_of_participants')} {participants.length}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">
              {t('field_label_number_of_winners')} {numberOfWinners}
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
  numberOfWinners: PropTypes.number.isRequired,
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

export default translate('PublishedRafflePage')(PublishedRafflePage);
