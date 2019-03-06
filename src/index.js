/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as EASApi from 'echaloasuerte-js-sdk';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import App from './components/App/App.jsx';
import theme from './EasTheme.jsx';
import config from './config/config';
import DeviceDetector from './components/DeviceDetector/DeviceDetector.jsx';

const { APIBasePath } = config;
const defaultClient = EASApi.ApiClient.instance;
defaultClient.basePath = APIBasePath;

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <DeviceDetector userAgent={window.navigator.userAgent}>
          <App />
        </DeviceDetector>
      </BrowserRouter>
    );
  }
}

const generateClassName = createGenerateClassName();

const Application = () => (
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </JssProvider>
);

ReactDOM.render(React.createElement(Application), document.getElementById('root'));
