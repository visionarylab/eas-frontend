import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';

import Number from './Number/Number';
import NumberDisplay from './Number/NumberDisplay';
import Letter from './Letter/Letter';
import BackArrow from '../BackArrow/BackArrow';

import STYLES from './Draw.scss';

const Draw = () => (
  <Grid container>
    <BackArrow />
    <div className={STYLES.Draw}>
      <Route exact path="/number" component={props => <Number {...props} />} />
      <Route exact path="/letter" component={props => <Letter {...props} />} />
      <Route path="/number/:drawId" component={props => <NumberDisplay {...props} />} />
    </div>
  </Grid>
);

export default Draw;

export const urls = '/(number|letter)?';
