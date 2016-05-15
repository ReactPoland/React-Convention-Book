const falcor = require('falcor');
const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;

import HttpDataSource from 'falcor-http-datasource';

class FalcorDataSource extends HttpDataSource {

  onBeforeRequest ( config ) {
    const jwt = localStorage.token;

    if (jwt) {
      config.headers[ 'Authorization' ] = jwt;
    }
  }
}

const model = new falcor.Model({
  source: new FalcorDataSource('/model.json')
});

export default model;