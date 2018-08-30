const utils = require('./utils.js')
// var qs = require('query-string')

const getAccessToken = (z, bundle) => {
    const promise = z.request(`${utils.BASE_URL}/login/oauth/access_token`, {
        method: 'POST',
        body: {
            code: bundle.inputData.code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            state: bundle.inputData.state,
            scope: 'public_repo'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
        }
    });

    // Needs to return at minimum, `access_token`, and if your app also does refresh, then `refresh_token` too
    return promise.then((response) => {
        if (response.status !== 200) {
            throw new Error('Unable to fetch access token: ' + response.content);
        }

        const result = JSON.parse(response.content);
        return {
            access_token: result.access_token
        };
    });
};


const testAuth = (z /*, bundle*/ ) => {
    // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
    // every user will have access to, such as an account or profile endpoint like /me.
    const promise = z.request({
        method: 'GET',
        url: `${utils.BASE_API_URL}/user`,
    });

    // This method can return any truthy value to indicate the credentials are valid.
    // Raise an error to show
    return promise.then((response) => {
        if (response.status === 401) {
            throw new Error('The access token you supplied is not valid');
        }
        return z.JSON.parse(response.content);
    });
};

module.exports = {
    type: 'oauth2',
    oauth2Config: {
        // Step 1 of the OAuth flow; specify where to send the user to authenticate with your API.
        // Zapier generates the state and redirect_uri, you are responsible for providing the rest.
        // Note: can also be a function that returns a string
        authorizeUrl: {
            url: `${utils.BASE_URL}/login/oauth/authorize`,
            params: {
                client_id: '{{process.env.CLIENT_ID}}',
                state: '{{bundle.inputData.state}}',
                redirect_uri: '{{bundle.inputData.redirect_uri}}'
            }
        },
        // Step 2 of the OAuth flow; Exchange a code for an access token.
        // This could also use the request shorthand.
        getAccessToken: getAccessToken,
        // (Optional) If the access token expires after a pre-defined amount of time, you can implement
        // this method to tell Zapier how to refresh it.
        // refreshAccessToken: refreshAccessToken,
        // If you want Zapier to automatically invoke `refreshAccessToken` on a 401 response, set to true
        // autoRefresh: false
        // If there is a specific scope you want to limit your Zapier app to, you can define it here.
        // Will get passed along to the authorizeUrl
        // scope: 'read,write'
    },
    // The test method allows Zapier to verify that the access token is valid. We'll execute this
    // method after the OAuth flow is complete to ensure everything is setup properly.
    test: testAuth,
    // assuming "username" is a key returned from the test
    connectionLabel: '{{login}}'
};