import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';


import Number from './Number/Number';
import Letter from './Letter/Letter';


import STYLES from './Draw.scss';

const Draw = () => (
  <Grid container className={STYLES.Draw}>
    {/* Add this arrow in the left side of the form to go back (change color and size) */}
    <Grid item sm={2}>
      <BrowserRouter>
      <Link to={"/"}>
        asd
        <Icon className={STYLES.Draw__back_arrow}>keyboard_arrow_left</Icon>
      </Link>
      </BrowserRouter>
    </Grid>
    <Grid item sm={8}>
          <Route path="/number" component={props => <Number {...props} />} />
          <Route path="/letter" component={props => <Letter {...props} />} />
    </Grid>
  </Grid>
);

export default Draw;
