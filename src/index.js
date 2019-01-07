/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as EASApi from 'echaloasuerte-js-sdk';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './components/App/App.jsx';
import theme from './EasTheme.jsx';
import config from './config/config';

const { APIBasePath } = config;
const defaultClient = EASApi.ApiClient.instance;
defaultClient.basePath = APIBasePath;

const Application = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(React.createElement(Application), document.getElementById('root'));
