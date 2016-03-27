const falcor = require('falcor');
const FalcorDataSource = require('falcor-http-datasource');
const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;

let headers;

if(localStorage.token) {
	headers = {
      headers: {
        'Authorization': 'Bearer' + localStorage.token
      }
    };
}

const model = new FalcorDataSource('/model.json', headers);

export default model;