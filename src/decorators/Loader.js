import React from 'react';
import { CircularProgress } from 'material-ui';

export default function Loader() {
  return function(Component) {
    return React.createClass({
      render() {
        return React.createElement(Component, {
          __showLoaderUntil() {
            const objToCheck = arguments[0];
            const args = Array.from(arguments).slice(1);
            let flags = [];

            // this checks only one level deep so you can't
            // specify arguments like: "menus", "sections", "items"
            args.forEach((arg) => flags.push(!objToCheck[arg]));

            const allItemsExist = !flags.includes(true);
            const shouldUpdate = allItemsExist !== this.state.loaded;

            if(shouldUpdate) {
              this.setState({
                loaded: allItemsExist
              });
            }
          },

          __getLoaderMarkup() {
            return (
              <div className="ViewLoaderWrapper">
                <CircularProgress size={2} />
              </div>
            );
          },

          ...this.props
        });
      }
    });
  }
}
