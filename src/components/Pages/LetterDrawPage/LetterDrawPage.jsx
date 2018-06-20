import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { translate, Trans } from 'react-i18next';

import PublicDetails from '../../PublicDetails/PublicDetails';
import MakeDrawPublicButton from '../../MakeDrawPublicButton/MakeDrawPublicButton';
import PublishDrawOptions from '../../PublishDrawOptions/PublishDrawOptions';
import DrawPanel from '../../DrawPanel/DrawPanel';
import TransparentPanel from '../../TransparentPanel/TransparentPanel';
import SectionPanel from '../../SectionPanel/SectionPanel';
import TossButton from '../../TossButton/TossButton';
import BackArrow from '../../BackArrow/BackArrow';
import Page from '../../Page/Page';

const LetterDrawPage = props => {
  const { values, onFieldChange, handleToss, handlePublish, t } = props;

  return (
    <Page htmlTitle={t('letter_draw_html_title')}>
      <Grid container spacing={16}>
        <Grid item sm={3}>
          <BackArrow />
        </Grid>
        <Grid item xs={6}>
          <DrawPanel>
            <div>
              <Typography variant="display1">{t('letter_draw_title')}</Typography>
              {values.isPublic && (
                <SectionPanel title={t('general_details_draw')}>
                  <PublicDetails
                    title={values.title}
                    description={values.description}
                    onFieldChange={onFieldChange}
                  />
                </SectionPanel>
              )}
              <SectionPanel title={t('draw_configuration')}>
                <div>
                  <TextField
                    label={t('number_of_letters')}
                    placeholder="1"
                    onChange={e => onFieldChange('numberOfLetters', parseInt(e.target.value, 10))}
                    value={values.numberOfLetters}
                    type="number"
                  />
                </div>
              </SectionPanel>
              {values.isPublic && (
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
                label={props.t(values.isPublic ? 'publish_draw' : 'generate_letters')}
                onClick={values.isPublic ? handlePublish : handleToss}
              />
            </div>
            <div>
              <span>{values.results}</span>
            </div>
          </DrawPanel>
        </Grid>

        <Grid item xs={3}>
          <TransparentPanel>
            <Paper>
              <Trans i18nKey="letter_draw_seo_description">
                <span>Organiza sorteos publicos</span>
              </Trans>
            </Paper>
            <MakeDrawPublicButton handleMakeDrawPublic={props.handleMakeDrawPublic} />
          </TransparentPanel>
        </Grid>
      </Grid>
    </Page>
  );
};

LetterDrawPage.propTypes = {
  values: PropTypes.shape({
    numberOfLetters: PropTypes.number.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  handleToss: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleMakeDrawPublic: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('LetterDrawPage')(LetterDrawPage);
