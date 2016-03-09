const falcor = require('falcor');
const FalcorDataSource = require('falcor-http-datasource');
const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;


const model = new falcor.Model({
  source: new FalcorDataSource('/model.json')
});

export default model;