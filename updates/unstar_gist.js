const utils = require('./../utils.js')

// create a particular star gist by name
const unStarGist = (z, bundle) => {
  const responsePromise = z.request({
    method: 'DELETE',
    url: `${utils.BASE_API_URL}/gists/${bundle.inputData.id}/star`,
    headers: {
      'content-length': 0
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'unstar_gist',
  noun: 'Unstar Gist',

  display: {
    label: 'Unstar Gist',
    description: 'Unstars a gist.'
  },

  operation: {
    inputFields: [{
      key: 'id',
      required: true,
      label: 'Gist',
      dynamic: 'gist.id.description'
    }],

    perform: unStarGist,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
