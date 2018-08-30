const utils = require('./../utils.js')

// get a single gist
const getGist = (z, bundle) => {
    //nothing to see here (yet!)
  // const responsePromise = z.request({
  //   url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
  // });
  // return responsePromise
  //   .then(response => z.JSON.parse(response.content));
};

// get a list of gists
const listGists = (z) => {
  const responsePromise = z.request({
    url: `${utils.BASE_API_URL}/gists`,
    params: {
      order_by: 'id desc'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular gist by name
const searchGists = (z, bundle) => {
   //nothing to see here (yet!)
  // const responsePromise = z.request({
  //   url: 'https://jsonplaceholder.typicode.com/posts',
  //   params: {
  //     query: `name:${bundle.inputData.name}`
  //   }
  // });
  // return responsePromise
  //   .then(response => z.JSON.parse(response.content));
};

// create a gist
const createGist = (z, bundle) => {
   //nothing to see here (yet!)
  // const responsePromise = z.request({
  //   method: 'POST',
  //   url: 'https://jsonplaceholder.typicode.com/posts',
  //   body: {
  //     name: bundle.inputData.name // json by default
  //   }
  // });
  // return responsePromise
  //   .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'gist',
  noun: 'Gist',

  get: {
    display: {
      label: 'Get Gist',
      description: 'Gets a gist.'
    },
    operation: {
      inputFields: [
        {key: 'id', required: true}
      ],
      perform: getGist
    }
  },

  list: {
    display: {
      label: 'New Gist',
      description: 'Lists the gists.',
      hidden: true
    },
    operation: {
      perform: listGists
    }
  },

  search: {
    display: {
      label: 'Find Gist',
      description: 'Finds a gist by searching.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: searchGists
    },
  },

  create: {
    display: {
      label: 'Create Gist',
      description: 'Creates a new gist.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: createGist
    },
  },

  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
