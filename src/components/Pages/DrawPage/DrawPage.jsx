import React from 'react';
import { Route } from 'react-router-dom';

import PublishedRandomNumberPageContainer from '../../Pages/RandomNumber/PublishedRandomNumberPageContainer';
import RafflePageContainer from '../../Pages/RafflePage/RafflePageContainer';
import PublishedRafflePageContainer from '../../Pages/RafflePage/PublishedRafflePageContainer';
import RandomNumberPageContainer from '../../Pages/RandomNumber/RandomNumberPageContainer';
import FacebookLoginRafflePageContainer from '../../Pages/FacebookLoginRaffle/FacebookLoginRafflePageContainer';
import FacebookDrawContainer from '../../Draw/Facebook/FacebookDraw/FacebookDrawContainer';
import PublishedFacebookLoginRafflePageContainer from '../../Pages/FacebookLoginRaffle/PublishedFacebookLoginRafflePageContainer';
import LetterDrawPageContainer from '../../Pages/LetterDrawPage/LetterDrawPageContainer';

import STYLES from './DrawPage.scss';

const DrawPage = () => (
  <div className={STYLES.DrawPage}>
    <Route exact path="/number" component={RandomNumberPageContainer} />
    <Route exact path="/raffle" component={props => <RafflePageContainer {...props} />} />
    <Route exact path="/facebookphoto" component={props => <FacebookDrawContainer {...props} />} />
    <Route exact path="/facebook" component={FacebookLoginRafflePageContainer} />
    <Route exact path="/letter" component={LetterDrawPageContainer} />
    <Route
      path="/raffle/:drawId"
      component={props => <PublishedRafflePageContainer {...props} />}
    />
    <Route path="/number/:drawId" component={PublishedRandomNumberPageContainer} />
    <Route
      path="/facebook/:drawId"
      component={props => <PublishedFacebookLoginRafflePageContainer {...props} />}
    />
  </div>
);

export default DrawPage;

export const urls = '/(number|letter)?';
