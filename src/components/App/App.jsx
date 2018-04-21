import React, { Component } from 'react';
// import { TranslatorProvider } from 'react-translate';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import HomePage from '../HomePage/HomePage';
import About from '../About/About';
import theme from './EasTheme';
import DrawPage, { urls } from '../DrawPage/DrawPage';
import Header from '../Header/Header';
import i18n from '../../i18n/i18n'; // initialized i18next instance
import STYLES from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  changeLanguage(locale) {
    i18n.changeLanguage(locale);
    const stuff = i18n;
    // debugger
  }

  render() {
    return (
      <div className={STYLES.App}>
        <I18nextProvider i18n={i18n}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Header onLanguageChange={l => this.changeLanguage(l)} />
                </Grid>
                <Grid item xs={12}>
                  <Switch>
                    <Route exact path="/" component={props => <HomePage {...props} />} />
                    <Route exact path="/about" component={About} />
                    <Route path={urls} component={props => <DrawPage {...props} />} />
                    <Route render={() => <div>Not found</div>} />
                  </Switch>
                </Grid>
              </Grid>
            </BrowserRouter>
          </MuiThemeProvider>
        </I18nextProvider>
      </div>
    );
  }
}

export default App;
