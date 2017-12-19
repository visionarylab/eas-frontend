import React, { Component } from 'react';
import { TranslatorProvider } from 'react-translate';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import theme from './EasTheme';
import TranslationsSwitch from './components/TranslationsSwitch';
import translations from './i18n/translations';
import available from './i18n/available';

import Number from './components/Draw/Number/Number';
import Draw, { urls } from './components/Draw/Draw';
import Letter from './components/Draw/Letter/Letter';

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
      <TranslatorProvider translations={this.state.translations}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography type="display3" align="center">
                  Échalo A Suerte
                </Typography>
                <TranslationsSwitch
                  onChange={l => this.changeLanguage(l)}
                  available={Object.keys(available)}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch>
                  <Route exact path="/" component={props => <Home {...props} />} />
                  <Route exact path={urls} component={props => <Draw {...props} />} />
                  <Route render={() => <div>Not found</div>} />
                </Switch>
              </Grid>
            </Grid>
          </BrowserRouter>
        </MuiThemeProvider>
      </TranslatorProvider>
    );
  }
}

export default App;
