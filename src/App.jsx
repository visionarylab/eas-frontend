import React, { Component } from "react"
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {MuiThemeProvider} from 'material-ui/styles';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import theme from './EasTheme';
import TranslationsSwitch from './components/TranslationsSwitch'
import translations from "./i18n/translations";
import available from "./i18n/available";
import { TranslatorProvider } from "react-translate"



import STYLES from './App.scss';

// const theme = createMuiTheme();

const loadTranslations = (l) =>
  fetch(`/i18n/${ l }.json`)
    .then((res) => res.json())

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      translations: translations('en-GB'),
    }
  }


  changeLanguage(locale) {
    this.setState({
      translations: translations(locale)
    })
  }

  render() {
    return(
      <TranslatorProvider translations={this.state.translations}>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography type="display3" align="center">
                Échalo A Suerte
              </Typography>
              <TranslationsSwitch
                onChange={(l) => this.changeLanguage(l)}
                available={Object.keys(available)}/>
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*<Button color="primary">Primary</Button>*/}
            {/*<Button color="accent">Accent</Button>*/}
            {/*<Button>hi material</Button>*/}
            {/*</Grid>*/}
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={props => <Home {...props}/>}/>
                <Draw/>
              </Switch>
            </BrowserRouter>
          </Grid>
        </MuiThemeProvider>
      </TranslatorProvider>
    )
  }
};

export default App;
