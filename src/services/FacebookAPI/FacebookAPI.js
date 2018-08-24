const DEBUG = false;
const log = message => DEBUG && console.log(message); // eslint-disable-line no-console
/**
 * Set up the FB SDK
 * @param {function} onStatusChange - Login/logout callback.
 * @return {undefined}
 */
export const fbAsyncInit = onStatusChange => {
  window.fbAsyncInit = () => {
    log('init FB');
    window.FB.init({
      appId: '239321593490183',
      autoLogAppEvents: true,
      xfbml: true,
      status: true,
      version: 'v3.0',
    });
    window.FB.Event.subscribe('auth.statusChange', onStatusChange);

    window.FB.Event.subscribe('auth.statusChange', response => {
      if (response.authResponse) {
        log('logged in');
      } else {
        log('logged out');
      }
    });
  };
};

/**
 * Set up the FB SDK
 * @param {string} endpoint - Endpoint to hit. E.g '/123123213/likes'
 * @param {string} accessToken - Access token used to make the request '/123123213/likes'
 * @return {Promise} - Response from the API
 */
export const apiCall = async (endpoint, accessToken = null) =>
  new Promise(async (accept, reject) => {
    log(`Facebook API call: ${endpoint} (Access Token: ${accessToken}`);
    const response = await new Promise(callback => {
      const options = accessToken ? { access_token: accessToken } : {};
      FB.api(endpoint, options, callback); // eslint-disable-line no-undef
    });
    log('Response:', response);
    if (response && !response.error) {
      return accept(response);
    }
    return reject(response);
  });

/**
 * Get the current user's name and id
 * @return {string} - Facebook pages names their AccessTokens
 * @throws {Exception}
 */
export const getUserDetails = async () => {
  const response = await apiCall('/me');
  if (response && !response.error) {
    return { userID: response.id, userName: response.name };
  }
  return 'error';
};

/**
 * Get the Facebook pages that the current user has granted access to
 * @return {object} - Facebook pages names their AccessTokens
 * @throws {Exception}
 */
export const getFacebookPages = async () => {
  const response = await apiCall('/me/accounts');
  if (response && !response.error) {
    const pages = response.data.map(page => ({
      pageName: page.name,
      accessToken: page.access_token,
    }));
    return pages;
  }
  return 'error';
};

/**
 * Get the people who liked a given facebook object
 * @param {string} objectId - Facebook object to check
 * @param {string} pageAccessToken - Page Access Token'
 * @return {Array} - People who liked the given object
 */
export const onGetLikes = async (objectId, pageAccessToken = null) => {
  const response = await apiCall(`${objectId}/likes`, pageAccessToken);
  const participants = response.data.map(item => item.name);
  return participants;
  // this.onFieldChange('participants', participants);
};

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');
  return hashes.reduce((params, hash) => {
    const [key, val] = hash.split('=');
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

export const getObjectIdFromUrl = urlString => {
  log('url:', urlString);
  const url = new URL(urlString);
  const path = url.pathname.replace(/\/$/, '');
  const searchParams = getUrlParams(url.search);
  let parcialObjectId = searchParams.story_fbid;
  let pageId = searchParams.id;
  if (pageId && parcialObjectId) {
    return `${pageId}_${parcialObjectId}`;
  }

  const PageRegex = /\/([0-9]+)/;
  const pageIdResults = path.match(PageRegex);
  if (!pageIdResults || pageIdResults.length <= 1) {
    throw Error('URL not valid');
  }
  pageId = pageIdResults[1];

  const objectRegex = /\/([0-9]+)(?=[^/]*$)/;
  const parcialObjectIdResults = path.match(objectRegex);
  if (!parcialObjectIdResults || parcialObjectIdResults.length <= 1) {
    throw Error('URL not valid');
  }
  parcialObjectId = parcialObjectIdResults[1];
  return `${pageId}_${parcialObjectId}`;
};
