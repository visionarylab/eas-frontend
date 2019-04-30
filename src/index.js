/* ********************************************************
 *          Client Side Rendering entry point             *
 ******************************************************** */
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

const generateClassName = createGenerateClassName();

class Application extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Frontload noServerRender>
            <JssProvider generateClassName={generateClassName}>
              <MuiThemeProvider theme={theme}>
                <DeviceDetector userAgent={window.navigator.userAgent}>
                  <App />
                </DeviceDetector>
              </MuiThemeProvider>
            </JssProvider>
          </Frontload>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(React.createElement(Application), document.getElementById('root'));
