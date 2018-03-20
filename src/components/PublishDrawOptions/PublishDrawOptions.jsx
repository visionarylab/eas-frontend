import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const PublishDrawOptions = props => (
  <div>
    {/* TODO do stuff here about inmediate publish or scheduled draw */}
    <Button raised color="primary" onClick={props.handlePublish}>
      {props.label_publish}
    </Button>
  </div>
);

PublishDrawOptions.propTypes = {
  label_publish: PropTypes.string.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

export default PublishDrawOptions;
