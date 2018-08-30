const utils = require('../utils.js')
const _ = require('lodash')
const samples = require('../samples/index.js')

const subscribeUrl = (bundle) => {
    return `${utils.BASE_API_URL}/repos/${bundle.inputData.owner}/${bundle.inputData.repoKey}/hooks`
}

const subscribeHook = (z, bundle) => {
    //this will perform the API request to subscribe to a webhook
    //https://developer.github.com/v3/repos/hooks/

    var data = {
        name: 'web',
        config: {
            url: bundle.targetUrl,
            content_type: 'json'
        },
        events: ['issues']
    }

    const options = {
        url: subscribeUrl(bundle),
        method: 'POST',
        body: JSON.stringify(data),
        json: true
    };

    // You may return a promise or a normal data structure from any perform method.
    return z.request(options)
        .then((response) => z.JSON.parse(response.content));
}

const unsubscribeHook = (z, bundle) => {
    //this will perform the API request to unsubscribe from a webhook
    const options = {
        url: bundle.URL,
        method: 'DELETE'
    };

    return z.request(options)
        .then((response) => JSON.parse(response.content));
}

// triggers on issue event with a certain tag
const getIssue = (z, bundle) => {
    var repo = bundle.cleanedRequest.issue;
    return [repo];
};

const listIssues = (z, bundle) => {
    const responsePromise = z.request({
        url: `${utils.BASE_API_URL}/repos/${bundle.inputData.owner}/${bundle.inputData.repoKey}/issues`
    });
    return responsePromise
        .then(response => {
            var commits = z.JSON.parse(response.content);
            if (!commits)
                return [];

            return _.map(commits, commit => {
                if (commit) {
                    return {
                        id: commit.sha
                    };
                }

                return {};
            });
        });

}

module.exports = {
    key: 'issue',
    noun: 'Issue Event',

    display: {
        label: 'Get Issue Event',
        description: 'Triggers on a new issue event.',
        important: true
    },

    operation: {
        inputFields: [{
                key: 'owner',
                label: 'Owner'
            },
            {
                key: 'repoKey',
                label: 'Repository Key'
            }
        ],

        type: 'hook',

        performSubscribe: subscribeHook,
        performUnsubscribe: unsubscribeHook,

        perform: getIssue,
        performList: listIssues,

        sample: samples.issue,

        outputFields: [{
                key: 'id',
                label: 'ID'
            },
            {
                key: 'name',
                label: 'Name'
            },
            {
                key: 'url',
                label: 'URL'
            }
        ]
    }
};