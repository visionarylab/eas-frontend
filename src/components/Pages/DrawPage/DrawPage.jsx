import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';

import NumberDrawContainer from '../../Draw/Number/NumberDraw/NumberDrawContainer';
import RaffleDrawContainer from '../../Draw/Raffle/RaffleDrawContainer/RaffleDrawContainer';
import PublishedRaffleContainer from '../../Draw/Raffle/PublishedRaffle/PublishedRaffleContainer';
import PublishedNumberDrawContainer from '../../Draw/Number/PublishedNumberDraw/PublishedNumberDrawContainer';
import Letter from '../../Draw/Letter/Letter';
import BackArrow from '../../BackArrow/BackArrow';

import STYLES from './DrawPage.scss';

const DrawPage = () => (
  <Grid container>
    <BackArrow />
    <div className={STYLES.DrawPage}>
      <Route exact path="/number" component={props => <NumberDrawContainer {...props} />} />
      <Route exact path="/raffle" component={props => <RaffleDrawContainer {...props} />} />
      <Route exact path="/letter" component={props => <Letter {...props} />} />
      <Route path="/raffle/:drawId" component={props => <PublishedRaffleContainer {...props} />} />
      <Route
        path="/number/:drawId"
        component={props => <PublishedNumberDrawContainer {...props} />}
      />
    </div>
  </Grid>
);

export default DrawPage;

export const urls = '/(number|letter)?';
