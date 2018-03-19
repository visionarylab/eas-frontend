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

import STYLES from './NumberPublicDraw.scss';

import { tossNumberDraw, createPublicNumberDraw } from '../../../../services/EasAPI';

const NumberPublicDraw = (props) => {
  return (
    <Grid container className={STYLES.NumberPublicDraw}>
      <Helmet>
        <title>{props.t('random_number_default_title')}</title>
      </Helmet>
      <Grid item xs={6}>
        <Grid item sm={12}>
          <Typography variant="display1">{props.t('random_number_default_title')}</Typography>
          <Grid item sm={12}>
            <TextField
              label={props.t('title')}
              placeholder={props.t('title_placeholder')}
              margin="normal"
              onChange={props.handleTitleChange}
              value={props.title}
              fullWidth
              type="text"
            />
            <TextField
              label={props.t('description')}
              onChange={props.handleDescriptionChange}
              multiline
              fullWidth
              rows="4"
              placeholder={props.t('description_placeholder')}
              value={props.description}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label={props.t('from')}
              placeholder="1"
              margin="normal"
              onChange={props.handleFromChange}
              value={props.from}
              type="number"
            />
            <TextField
              label={props.t('to')}
              placeholder="9"
              margin="normal"
              onChange={props.handleToChange}
              value={props.to}
              type="number"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label={props.t('number_of_results')}
              placeholder="1"
              margin="normal"
              onChange={props.handleNumberOfResultsChange}
              value={props.numberOfResults}
              type="number"
            />
          </Grid>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.allowRepeated}
                  onChange={props.handleAllowRepeatedChange}
                />
              }
              label={props.t('allow_repeated')}
            />
          </FormGroup>
          <Grid item xs={12}>
            <Button raised color="primary" onClick={props.handleToss} >
              {props.t('generate_numbers')}
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <span className={STYLES.NumberPublicDraw__result}>{props.results}</span>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={16} direction="row" alignItems="center">
          <Grid item xs={10}>
            <Paper>{props.t('random_number_description')}</Paper>
          </Grid>
          <Grid item xs={10}>
            <Button raised color="primary" onClick={props.handleMakeDrawPublic}>
              <Public />
              {props.t('make_public')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

NumberPublicDraw.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.number),
  numberOfResults: PropTypes.number,
  allowRepeated: PropTypes.bool,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleFromChange: PropTypes.func.isRequired,
  handleToChange: PropTypes.func.isRequired,
  handleAllowRepeatedChange: PropTypes.func.isRequired,
  handleNumberOfResultsChange: PropTypes.func.isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NumberPublicDraw.defaultProps = {
  title: '',
  description: '',
  from: 1,
  to: 10,
  results: [],
  numberOfResults: 1,
  allowRepeated: false,
};

export default translate('NumberPublicDraw')(NumberPublicDraw);
