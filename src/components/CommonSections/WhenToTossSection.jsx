import React from 'react';
import PropTypes from 'prop-types';
import PublishDrawOptions from '../PublishDrawOptions/PublishDrawOptions';
import SectionPanel from '../SectionPanel/SectionPanel';

const WhenToTossSection = ({ dateScheduled, onFieldChange, t }) => (
  <SectionPanel title={t('when_to_toss')}>
    <PublishDrawOptions
      options={['now', 'schedule']}
      dateScheduled={dateScheduled}
      onFieldChange={onFieldChange}
    />
  </SectionPanel>
);
WhenToTossSection.propTypes = {
  dateScheduled: PropTypes.instanceOf(Date),
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

WhenToTossSection.defaultProps = {
  dateScheduled: null,
};

export default WhenToTossSection;
