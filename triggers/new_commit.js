const utils = require('./../utils.js')

// triggers on new commit with a certain tag
const triggerNewCommit = (z, bundle) => {
  const responsePromise = z.request({
    url: `${utils.BASE_API_URL}/repos/${bundle.inputData.owner}/${bundle.inputData.repoKey}/commits`
  });
  return responsePromise
    .then(response =>{ 
      var commits = z.JSON.parse(response.content);
      Array.prototype.forEach.call(commits, commit => {
        commit.id = commit.sha
      });
    return commits;
    });
};

module.exports = {
  key: 'new_commit',
  noun: 'New Commit',

  display: {
    label: 'New Commit',
    description: 'Triggers on a new new commit.'
  },

  operation: {
    inputFields: [
      {key: 'owner', label: 'Owner'},
      {key:'repoKey', label: 'Repository Key'}
    ],
    perform: triggerNewCommit,

    sample: {
      "id": "MDY6Q29tbWl0MTQ0MzEyNzQ0OmQ0NjliOWNmMjVhZDE0MjI2NzgyZDFlOWQxMTY3MGY3YjNkMWMzODE=",
      "node_id": "MDY6Q29tbWl0MTQ0MzEyNzQ0OmQ0NjliOWNmMjVhZDE0MjI2NzgyZDFlOWQxMTY3MGY3YjNkMWMzODE=",
      "url": "https://api.github.com/repos/rghazali10/test-repo/commits/d469b9cf25ad14226782d1e9d11670f7b3d1c381"
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'sha', label: 'SHA'},
      {key: 'url', label: 'URL'}
    ]
  }
};
