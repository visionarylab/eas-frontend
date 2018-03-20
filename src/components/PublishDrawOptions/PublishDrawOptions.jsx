import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const PublishDrawOptions = props => (
  <Button raised color="primary" onClick={props.handlePublish}>
    {props.label_publish}
  </Button>
);

PublishDrawOptions.propTypes = {
  label_publish: PropTypes.string.isRequired,
  label_schedule: PropTypes.string.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

export default PublishDrawOptions;
