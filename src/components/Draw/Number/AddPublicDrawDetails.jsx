import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Public from 'material-ui-icons/Public';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import STYLES from './Number.scss';

import { tossNumberDraw, createPublicNumberDraw } from '../../../services/EasAPI';

class AddPublicDrawDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleFromChange = this.handleFromChange.bind(this);

    this.state = {
      title: '',
      description: '',
    };
  }

  handleFromChange(event) {
    this.setState({
      from: parseInt(event.target.value, 10),
    });
  }

  render() {
    return (
      <Grid container className={STYLES.Number}>
        <Grid item xs={6}>
          <Grid item sm={12}>
            <Grid item sm={12}>
              <TextField
                label={this.props.t('title')}
                placeholder="1"
                margin="normal"
                onChange={this.handleFromChange}
                value={this.state.from}
                type="text"
              />
              <TextField
                label={this.props.t('description')}
                placeholder="9"
                margin="normal"
                onChange={this.handleFromChange}
                value={this.state.description}
                type="text"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AddPublicDrawDetails.propTypes = {
  t: PropTypes.func.isRequired,
};

AddPublicDrawDetails.defaultProps = {
};

export default translate('AddPublicDrawDetails')(AddPublicDrawDetails);
