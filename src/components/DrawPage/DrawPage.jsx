import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';

import Number from '../Draw/Number/Number';
import NumberDisplay from '../Draw/Number/NumberDisplay';
import Letter from '../Draw/Letter/Letter';
import BackArrow from '../BackArrow/BackArrow';

import STYLES from './DrawPage.scss';

const DrawPage = () => (
  <Grid container>
    <BackArrow />
    <div className={STYLES.DrawPage}>
      <Route exact path="/number" component={props => <Number {...props} />} />
      <Route exact path="/letter" component={props => <Letter {...props} />} />
      <Route path="/number/:drawId" component={props => <NumberDisplay {...props} />} />
    </div>
  </Grid>
);

export default DrawPage;

export const urls = '/(number|letter)?';
