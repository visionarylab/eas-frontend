import React from 'react';
import ReactDOM from 'react-dom';
import * as EASApi from 'echaloasuerte-js-sdk';
import App from './components/App/App';
import config from './config/config';

const { APIBasePath } = config;
const defaultClient = EASApi.ApiClient.instance;
defaultClient.basePath = APIBasePath;

ReactDOM.render(React.createElement(App), document.getElementById('root'));
