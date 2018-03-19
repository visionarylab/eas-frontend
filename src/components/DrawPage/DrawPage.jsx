import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';

import NumberPrivateDraw from '../Draw/Number/NumberPrivateDraw/NumberPrivateDraw';
import NumberPublicDrawContainer from '../Draw/Number/NumberPublicDrawContainer/NumberPublicDrawContainer';
import NumberDisplay from '../Draw/Number/NumberDisplay';
import Letter from '../Draw/Letter/Letter';
import BackArrow from '../BackArrow/BackArrow';

import STYLES from './DrawPage.scss';

const DrawPage = () => (
  <Grid container>
    <BackArrow />
    <div className={STYLES.DrawPage}>
      <Route exact path="/number" component={props => <NumberPrivateDraw {...props} />} />
      <Route exact path="/public/number" component={props => <NumberPublicDrawContainer {...props} />} />
      <Route exact path="/letter" component={props => <Letter {...props} />} />
      <Route path="/number/:drawId" component={props => <NumberDisplay {...props} />} />
    </div>
  </Grid>
);

export default DrawPage;

export const urls = '/(number|letter)?';
