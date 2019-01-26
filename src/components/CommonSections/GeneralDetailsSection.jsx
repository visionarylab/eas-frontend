import React from 'react';
import PropTypes from 'prop-types';
import PublicDetails from '../PublicDetails/PublicDetails.jsx';
import SectionPanel from '../SectionPanel/SectionPanel.jsx';

const GeneralDetailsSection = ({ sectionTitle, title, description, onFieldChange }) => (
  <SectionPanel title={sectionTitle}>
    <PublicDetails title={title} description={description} onFieldChange={onFieldChange} />
  </SectionPanel>
);
GeneralDetailsSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
};

GeneralDetailsSection.defaultProps = {
  title: '',
  description: '',
};

export default GeneralDetailsSection;
