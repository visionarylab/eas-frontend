const debug = true;

/**
 * Set up the FB SDK
 * @param {function} onStatusChange - Login/logout callback.
 * @return {undefined}
 */
export const fbAsyncInit = onStatusChange => {
  console.log('facebook');
  window.FB.init({
    appId: '239321593490183',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
  });
  window.FB.Event.subscribe('auth.statusChange', onStatusChange);

  if (debug) {
    window.FB.Event.subscribe('auth.statusChange', response => {
      if (response.authResponse) {
        console.log('logged in');
      } else {
        console.log('logged out');
      }
    });
  }
};

/**
 * Set up the FB SDK
 * @param {string} endpoint - Endpoint to hit. E.g '/123123213/likes'
 * @return {Promise} - Response from the API
 */
const apiCall = async (endpoint, accessToken = null) =>
  new Promise(async (accept, reject) => {
    console.log(`Facebook API call: ${endpoint} (Access Token: ${accessToken}`);
    const response = await new Promise(callback => {
      const options = accessToken ? { access_token: accessToken } : {};
      FB.api(endpoint, options, callback);
    });
    console.log('Response:', response);
    if (response && !response.error) {
      return accept(response);
    }
    return reject(response);
  });

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
 * @param {string} pageAccessToken - Page Access Token'
 * @param {string} objectId - Facebook object to check
 * @return {Array} - People who liked the given object
 */
export const onGetLikes = async (objectId, accessToken = null) => {
  const response = await apiCall(`${objectId}/likes`, accessToken);
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
  console.log('url:', urlString);
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
