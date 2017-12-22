import React, { Component } from 'react';
import { TranslatorProvider } from 'react-translate';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import theme from './EasTheme';
import translations from './i18n/translations';

import Draw, { urls } from './components/Draw/Draw';
import Header from './components/Header/Header';

import STYLES from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translations: translations('en-GB'),
    };
  }

  changeLanguage(locale) {
    this.setState({
      translations: translations(locale),
    });
  }

  render() {
    return (
      <div className={STYLES.App}>
        <TranslatorProvider translations={this.state.translations}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Header onLanguageChange={l => this.changeLanguage(l)} />
                </Grid>
                <Grid item xs={12}>
                  <Switch>
                    <Route exact path="/" component={props => <Home {...props} />} />
                    <Route exact path="/about" component={About} />
                    <Route exact path={urls} component={props => <Draw {...props} />} />
                    <Route render={() => <div>Not found</div>} />
                  </Switch>
                </Grid>
              </Grid>
            </BrowserRouter>
          </MuiThemeProvider>
        </TranslatorProvider>
      </div>
    );
  }
}

export default App;
