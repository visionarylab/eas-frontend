import path from 'path';
import fs from 'fs';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import setupApi from '../src/setupApi';
import createStore from '../src/store';
import DeviceDetector from '../src/components/DeviceDetector/DeviceDetector.jsx';
import App from '../src/components/App/App.jsx';
import theme from '../src/EasTheme.jsx';
import { setHostname } from '../src/actions/hostnameActions';

export default (req, res) => {
  /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */
  const injectHTML = (data, { html, title, meta, body, state, css }) => {
    let content = data;
    content = content.replace('<html>', `<html ${html}>`);
    content = content.replace(/<title>.*?<\/title>/g, title);
    content = content.replace('</head>', `${meta}</head>`);
    content = content.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`,
    );
    content = content.replace(
      '<style id="jss-server-side"></style>',
      `<style id="jss-server-side">${css}</style>`,
    );
    return content;
  };
  const hostname = req.headers.host;
  // Setup the EAS API
  setupApi(hostname);

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Load in our HTML file from our build
  // eslint-disable-next-line consistent-return
  fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error('Read error', err);
      return res.status(404).end();
    }

    const { store } = createStore(req.url);

    store.dispatch(setHostname(hostname));

    const context = {};
    frontloadServerRender(() =>
      renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
              <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <DeviceDetector userAgent={req.headers['user-agent']}>
                  <Frontload isServer>
                    <App />
                  </Frontload>
                </DeviceDetector>
              </MuiThemeProvider>
            </JssProvider>
          </StaticRouter>
        </Provider>,
      ),
    ).then(routeMarkup => {
      // We need to tell Helmet to compute the right meta tags, title, and such
      const helmet = Helmet.renderStatic();

      // Grab the CSS from our sheetsRegistry.
      const css = sheetsRegistry.toString();

      // Build the markup
      const html = injectHTML(htmlData, {
        html: helmet.htmlAttributes.toString(),
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        body: routeMarkup,
        state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
        css,
      });

      res.send(html);
    });
  });
};
