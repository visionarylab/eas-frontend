import React from 'react';
import { BpkCode } from 'bpk-component-code';
import BpkText from 'bpk-component-text';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import EasButton from './components/EasButton/EasButton';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import theme from './EasTheme';

import STYLES from './App.scss';

const c = className => STYLES[className] || 'UNKNOWN';

// const theme = createMuiTheme();

const App = () => (
// MuiThemeProvider takes the theme as a property and passed it down the hierarchy.
  <MuiThemeProvider theme={theme}>
  <div className={c('App')}>
    <header className={c('App__header')}>
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={12}>
            <BpkText tagName="h1" textStyle="xxl" className={c('App__heading')}>Welcome to React + Backpack</BpkText>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
    </header>
    <main className={c('App__main')}>
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={12}>
            <BpkText tagName="p" className={c('App__text')}>
              To get started, edit <BpkCode>src/App.jsx</BpkCode> and save to reload.
            </BpkText>
            <EasButton>ieeeee</EasButton>
            <Button color="primary">Primary</Button>
            <Button color="accent">Accent</Button>
            <Button>hi material</Button>
            <BrowserRouter>
              <div>
              <Route exact path="/" component={props => <Home {...props}/>} />
              <Route exact path="/draw" component={Draw} />
              </div>
            </BrowserRouter>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
    </main>
  </div>
  </MuiThemeProvider>
);

export default App;
