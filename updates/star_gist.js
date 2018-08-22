const utils = require('./../utils.js')

// create a particular star gist by name
const starGist = (z, bundle) => {
  const responsePromise = z.request({
    method: 'PUT',
    url: `${utils.BASE_API_URL}/gists/${bundle.inputData.id}/star`,
    headers: {
      'content-length': 0
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'star_gist',
  noun: 'Star Gist',

  display: {
    label: 'Star Gist',
    description: 'Stars a gist.'
  },

  operation: {
    inputFields: [{
      key: 'id',
      required: true,
      label: 'Gist',
      dynamic: 'gist.id.description'
      }],
    perform: starGist,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [{
        key: 'id',
        label: 'ID'
      },
      {
        key: 'name',
        label: 'Name'
      }
    ]
  }
};