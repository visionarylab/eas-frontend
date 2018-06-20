import React from 'react';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import NumberDrawContainer from '../../Draw/Number/NumberDraw/NumberDrawContainer';
import RaffleDrawContainer from '../../Draw/Raffle/RaffleDraw/RaffleDrawContainer';
import PublishedRaffleContainer from '../../Draw/Raffle/PublishedRaffle/PublishedRaffleContainer';
import PublishedNumberDrawContainer from '../../Draw/Number/PublishedNumberDraw/PublishedNumberDrawContainer';
import FacebookLoginDrawContainer from '../../Draw/FacebookLogin/FacebookLoginDrawContainer';
import FacebookDrawContainer from '../../Draw/Facebook/FacebookDraw/FacebookDrawContainer';
import PublishedFacebookLoginDrawContainer from '../../Draw/FacebookLogin/PublishedFacebookLoginDrawContainer';
import LetterDrawPageContainer from '../../Pages/LetterDrawPage/LetterDrawPageContainer';

import STYLES from './DrawPage.scss';

const DrawPage = () => (
  <div className={STYLES.DrawPage}>
    <Route exact path="/number" component={props => <NumberDrawContainer {...props} />} />
    <Route exact path="/raffle" component={props => <RaffleDrawContainer {...props} />} />
    <Route exact path="/facebookphoto" component={props => <FacebookDrawContainer {...props} />} />
    <Route exact path="/facebook" component={props => <FacebookLoginDrawContainer {...props} />} />
    <Route exact path="/letter" component={LetterDrawPageContainer} />
    <Route path="/raffle/:drawId" component={props => <PublishedRaffleContainer {...props} />} />
    <Route
      path="/number/:drawId"
      component={props => <PublishedNumberDrawContainer {...props} />}
    />
    <Route
      path="/facebook/:drawId"
      component={props => <PublishedFacebookLoginDrawContainer {...props} />}
    />
  </div>
);

export default DrawPage;

export const urls = '/(number|letter)?';
