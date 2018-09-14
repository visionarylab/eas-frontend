import React from 'react';
import PropTypes from 'prop-types';
import PublicDetails from '../PublicDetails/PublicDetails';
import SectionPanel from '../SectionPanel/SectionPanel';

const GeneralDetailsSection = ({ sectionTitle, title, description, onFieldChange }) => (
  <SectionPanel title={sectionTitle}>
    <PublicDetails title={title} description={description} onFieldChange={onFieldChange} />
  </SectionPanel>
);
GeneralDetailsSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default GeneralDetailsSection;
