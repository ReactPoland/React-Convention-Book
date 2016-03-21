import axios from 'axios';
import model from '../falcorModel.js';
import {
  ref as $ref,
  atom as $atom,
  error as $error
} from 'falcor/dist/falcor.browser';

export default {
  get: falcorGet,
  getValue: falcorGetValue,
  set: falcorSet,
  create: falcorCreate,
  delete: falcorDelete,

  // util for debugging falcor model
  $log: (msg) => {
    console.info("\n\n\n MODEL IS BELOW\n\n\n ");
    console.info(msg, model._root.cache);
    console.info("\n\n\n MODEL IS ABOVE\n\n\n ");
  }
};



/**
 * Getting stuff from db
 */
async function falcorGet(url) {
  const response = await model
    .get(url)
    .then((response) => {
      console.log('API response GET: ', response.json);
      return response.json;
    })
    .catch((error) => {
      console.error(url, error);
    });

  return response;
}

async function falcorGetValue(url) {
  const response = await model
    .getValue(url)
    .then((response) => {
      console.log('API response GET: ', response);
      return response;
    })
    .catch((error) => {
      console.error(url, error);
    });

  return response;
}


/**
 *  Setting simple values
 */
async function falcorSet({url, body}) {
  const response = await model
    .setValue(url, body)
    .then((response) => {
      console.log('API response SET: ', response);
      return response;
    });

  return response;
}



/**
 * Create object and set it as reference (optionally)
 */
async function falcorCreate({url, body, ref}) {
  const id = Math.random().toString().substring(2, 14);
  url = url.concat(id);
  body.id = id;

  const response = await model
    // first, create object
    .setValue(url, body)
    .then((response) => {

      // check if it should be added as ref to something
      if(ref) {

        // if so, get length of array and put item reference on the end
        return model
        .getValue(ref.concat('length'))
        .then((size) => {
          return model
            .setValue(ref.concat(size), $ref(url))
            .then(() => {
              return body;
            });
        });
      } else {
        return body;
      }
    });

  return body;
}



async function falcorDelete({url, ref}) {
  const response = await model
    .setValue(url, null)
    .then((response) => {
      if(ref) {
        return model
          .setValue(ref, null)
          .then((response) => {
            return response;
          });
      } else {
        return response
      }
    });

  return response;
}
