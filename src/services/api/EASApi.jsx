import * as EASApi from './client/src';

const defaultClient = EASApi.ApiClient.instance;

defaultClient.basePath = 'http://localhost:8000/api';

export default EASApi;
