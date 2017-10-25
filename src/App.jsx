import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {MuiThemeProvider} from 'material-ui/styles';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import theme from './EasTheme';


import STYLES from './App.scss';

// const theme = createMuiTheme();

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography type="display3" align="center">
            Échalo A Suerte
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary">Primary</Button>
          <Button color="accent">Accent</Button>
          <Button>hi material</Button>
        </Grid>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={props => <Home {...props}/>}/>
            <Draw/>
          </Switch>
        </BrowserRouter>
      </Grid>
    </MuiThemeProvider>
  );
};

export default App;
