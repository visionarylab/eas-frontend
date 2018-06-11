import React, { Fragment } from 'react';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import PublicDetails from '../../../PublicDetails/PublicDetails';
import MakeDrawPublicButton from '../../../MakeDrawPublicButton/MakeDrawPublicButton';
import NumberDrawForm from '../NumberDrawForm/NumberDrawForm';
import NumberDrawResults from '../NumberDrawResults/NumberDrawResults';
import GenerateResultsButton from '../../../GenerateResultsButton/GenerateResultsButton';
import PublishDrawOptions from '../../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../../DrawPanel/DrawPanel';
import TransparentPanel from '../../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../../SectionPanel/SectionPanel';
import TossButton from '../../../TossButton/TossButton';

const NumberDraw = props => {
  const { values, onFieldChange, handleToss, handlePublish, t } = props;
  const {
    title,
    description,
    from,
    to,
    allowRepeated,
    numberOfResults,
    dateScheduled,
    isPublic,
    results,
  } = values;
  return (
    <Fragment>
      <Helmet>
        <title>{t('random_number_html_title')}</title>
      </Helmet>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <DrawPanel>
            <Grid item sm={12}>
              <Typography variant="display1">{t('random_number_default_title')}</Typography>
              {isPublic && (
                <SectionPanel title={t('general_details_draw')}>
                  <PublicDetails
                    title={title}
                    description={description}
                    onFieldChange={onFieldChange}
                  />
                </SectionPanel>
              )}
              <SectionPanel title={t('draw_configuration')}>
                <div>
                  <TextField
                    label={t('from')}
                    placeholder="1"
                    onChange={e => onFieldChange('from', parseInt(e.target.value, 10))}
                    value={values.from}
                    type="number"
                  />
                  <TextField
                    label={t('to')}
                    placeholder="9"
                    onChange={e => onFieldChange('to', parseInt(e.target.value, 10))}
                    value={values.to}
                    type="number"
                  />
                </div>
                <div>
                  <TextField
                    label={t('number_of_results')}
                    placeholder="1"
                    onChange={e => onFieldChange('numberOfResults', parseInt(e.target.value, 10))}
                    value={values.numberOfResults}
                    type="number"
                  />
                  {values.numberOfResults > 1 && (
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.allowRepeated}
                            onChange={e => onFieldChange('allowRepeated', e.target.checked)}
                          />
                        }
                        label={props.t('allow_repeated')}
                      />
                    </FormGroup>
                  )}
                </div>
              </SectionPanel>
              {isPublic && (
                <SectionPanel title={t('when_to_toss')}>
                  <PublishDrawOptions
                    whenToToss={values.whenToToss}
                    options={['now', 'manual', 'schedule']}
                    dateScheduled={values.dateScheduled}
                    onFieldChange={props.onFieldChange}
                  />
                </SectionPanel>
              )}
              <TossButton
                label={props.t(isPublic ? 'publish_draw' : 'generate_numbers')}
                onClick={isPublic ? handlePublish : handleToss}
              />
            </Grid>
            <Grid item sm={12}>
              <NumberDrawResults results={results} />
            </Grid>
          </DrawPanel>
        </Grid>

        <Grid item xs={6}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="number_draw_seo_description">
                <span>Organiza sorteos publicos</span>
              </Trans>
            </Paper>
            <MakeDrawPublicButton handleMakeDrawPublic={props.handleMakeDrawPublic} />
          </TransparentPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

NumberDraw.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    from: PropTypes.number,
    to: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.number),
    numberOfResults: PropTypes.number,
    allowRepeated: PropTypes.bool,
    isPublic: PropTypes.bool.isRequired,
    dateScheduled: PropTypes.string,
  }).isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NumberDraw.defaultProps = {
  values: {
    title: '',
    description: '',
    from: 1,
    to: 10,
    results: [],
    numberOfResults: 1,
    allowRepeated: false,
    dateScheduled: null,
  },
};

export default translate('NumberDraw')(NumberDraw);
