import React                  from 'react';
import ReactDOM               from 'react-dom';
import createBrowserHistory   from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import Root                   from './containers/Root';
import configureStore         from './store/configureStore';
import injectTapEventPlugin   from 'react-tap-event-plugin';


function getSubdomain() {
        var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
        var urlParts = regexParse.exec(window.location.hostname);
        return window.location.hostname.replace(urlParts[0],'').slice(0, -1);
}

console.info("---> getSubdomain --->", getSubdomain());



injectTapEventPlugin();

const target  = document.getElementById('root');
const history = createBrowserHistory();

export const store = configureStore(window.__INITIAL_STATE__, __DEBUG__);

syncReduxAndRouter(history, store);

const node = (
  <Root
    history={history}
    store={store}
    debug={__DEBUG__}
    debugExternal={__DEBUG_NW__}
  />
);

ReactDOM.render(node, target);
