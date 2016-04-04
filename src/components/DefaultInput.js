import React from 'react';
// import Formsy from 'formsy-react'
import {TextField} from 'material-ui';


// /*
//   to refactor and use ES6
//  */
// export const DefaultInput = React.createClass({
//   mixins: [Formsy.Mixin],

//   getDefaultProps() {
//     return {
//       onChange: () => {}
//     };
//   },

//   changeValue(e) {
//     this.setValue(e.target.value);
//     this.props.onChange(e);
//   },

//   render() {
//     const errorMessage = this.getErrorMessage();

//     return (
//       <div>
//         <TextField
//           floatingLabelText={this.props.defaultValue ? '' : this.props.title}
//           floatingLabelStyle={{fontWeight: 300}}
//           fullWidth={(this.props.style && !this.props.style.width) || true}
//           style={this.props.style}
//           autoFocus={this.props.autoFocus}
//           ref={this.props.name}
//           defaultValue={this.props.defaultValue || ''}
//           errorText={errorMessage}
//           type={this.props.type || 'text'}
//           name={this.props.name}
//           onChange={this.changeValue}
//           onBlur={this.props.onBlur}
//           onEnterKeyDown={this.props.onEnterKeyDown}
//           required={this.props.required}
//           multiLine={this.props.multiLine}
//           rows={this.props.rows}
//           value={this.props.value || this.getValue()} />
//         {this.props.children}
//       </div>
//     );
//   }
// });


import {HOC} from 'formsy-react';

class DefaultInput extends React.Component {
  render() {

    return (
      <div>
        <TextField
          floatingLabelText={this.props.defaultValue ? '' : this.props.title}
          floatingLabelStyle={{fontWeight: 300}}
          fullWidth={(this.props.style && !this.props.style.width) || true}
          style={this.props.style}
          autoFocus={this.props.autoFocus}
          ref={this.props.name}
          defaultValue={this.props.defaultValue || ''}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          onBlur={this.props.onBlur}
          onEnterKeyDown={this.props.onEnterKeyDown}
          required={this.props.required}
          multiLine={this.props.multiLine}
          rows={this.props.rows}
          value={this.props.value} />
        {this.props.children}
      </div>
    );
  }
};
export default HOC(DefaultInput);