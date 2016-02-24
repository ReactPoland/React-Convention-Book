import React                    from 'react';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import routes                   from '../routes';
import DevTools                 from './DevTools';
import { createDevToolsWindow } from '../utils';
import createHashHistory        from 'history/lib/createHashHistory';

let noQueryKeyHistory = createHashHistory({
  queryKey: false
});

export default class Root extends React.Component {
  static propTypes = {
    history : React.PropTypes.object.isRequired,
    store   : React.PropTypes.object.isRequired,
    debug   : React.PropTypes.bool,
    debugExternal : React.PropTypes.bool
  }

  static defaultProps = {
    debug : false,
    debugExternal : false
  }

  renderDevTools () {
    // @P: I usually do not use devtools because they're annoying
    /// comment out first 'return' to get them
    return null;
    if (!this.props.debug) {
      return null;
    }

    return this.props.debugExternal ?
      createDevToolsWindow(this.props.store) : <DevTools />;
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          {
              // !! IMPORTANT - FYI !!
              // removing the <Router history={this.props.history}>
              // helps makeing client-side without requirement of running redux server-side
              // http://localhost:3000/#/ - specificaly we are talking about this /#/ that helps
              // run the app 100% client side
          }
          <Router history={noQueryKeyHistory}>
            {routes}
          </Router>
          {this.renderDevTools()}
        </div>
      </Provider>
    );
  }
}
