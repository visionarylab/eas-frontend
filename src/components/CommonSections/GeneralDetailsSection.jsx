import React from 'react';
import PropTypes from 'prop-types';
import PublicDetails from '../PublicDetails/PublicDetails';
import SectionPanel from '../SectionPanel/SectionPanel';

const GeneralDetailsSection = ({ title, description, onFieldChange, t }) => (
  <SectionPanel title={t('general_details_raffle')}>
    <PublicDetails title={title} description={description} onFieldChange={onFieldChange} />
  </SectionPanel>
);
GeneralDetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default GeneralDetailsSection;
