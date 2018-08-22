import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import PublishedRandomNumberPageContainer from '../../Pages/RandomNumber/PublishedRandomNumberPageContainer';
import RafflePageContainer from '../../Pages/RafflePage/RafflePageContainer';
import PublishedRafflePageContainer from '../../Pages/RafflePage/PublishedRafflePageContainer';
import RandomNumberPageContainer from '../../Pages/RandomNumber/RandomNumberPageContainer';
import FacebookLoginRafflePageContainer from '../../Pages/FacebookLoginRaffle/FacebookLoginRafflePageContainer';
import PublishedFacebookLoginRafflePageContainer from '../../Pages/FacebookLoginRaffle/PublishedFacebookLoginRafflePageContainer';
import FacebookPhotoRafflePageContainer from '../../Pages/FacebookPhotoRaffle/FacebookPhotoRafflePageContainer';
import PublishedFacebookPhotoRafflePageContainer from '../../Pages/FacebookPhotoRaffle/PublishedFacebookPhotoRafflePageContainer';
import LetterDrawPageContainer from '../../Pages/LetterDrawPage/LetterDrawPageContainer';
import SpinArrowPageContainer from '../../Pages/SpinArrowPage/SpinArrowPageContainer';

const DrawPage = () => (
  <Fragment>
    <Route exact path="/number" component={RandomNumberPageContainer} />
    <Route exact path="/raffle" component={props => <RafflePageContainer {...props} />} />
    <Route exact path="/facebook_photo" component={FacebookPhotoRafflePageContainer} />
    <Route exact path="/facebook_login" component={FacebookLoginRafflePageContainer} />
    <Route exact path="/letter" component={LetterDrawPageContainer} />
    <Route exact path="/arrow" component={SpinArrowPageContainer} />

    <Route path="/raffle/:drawId" component={PublishedRafflePageContainer} />
    <Route path="/number/:drawId" component={PublishedRandomNumberPageContainer} />
    <Route path="/facebook_login/:drawId" component={PublishedFacebookLoginRafflePageContainer} />
    <Route path="/facebook_photo/:drawId" component={PublishedFacebookPhotoRafflePageContainer} />
  </Fragment>
);

export default DrawPage;

export const urls = '/(number|letter)?';
