/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Frontload } from 'react-frontload';
import JssProvider from 'react-jss/lib/JssProvider';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import App from './components/App/App.jsx';
import theme from './EasTheme.jsx';
import DeviceDetector from './components/DeviceDetector/DeviceDetector.jsx';
import setupApi from './setupApi';
import createStore from './store';

setupApi();
const { store, history } = createStore();

class Main extends React.Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Frontload noServerRender>
            <DeviceDetector userAgent={window.navigator.userAgent}>
              <App />
            </DeviceDetector>
          </Frontload>
        </ConnectedRouter>
      </Provider>
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
