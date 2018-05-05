import React from 'react';
import Grid from 'material-ui/Grid';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import About from '../About/About';
import DrawPage, { urls } from '../DrawPage/DrawPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AppShell = () => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12}>
      <Switch>
        <Route exact path="/" component={props => <HomePage {...props} />} />
        <Route exact path="/about" component={About} />
        <Route path={urls} component={props => <DrawPage {...props} />} />
        <Route render={() => <div>Not found</div>} />
      </Switch>
    </Grid>
    <Footer />
  </Grid>
);

AppShell.propTypes = {};

export default AppShell;
