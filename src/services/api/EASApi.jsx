import * as EASApi from './client/src';

const defaultClient = EASApi.ApiClient.instance;

defaultClient.basePath = 'http://0.0.0.0:8080/api/v1';

export default EASApi;
