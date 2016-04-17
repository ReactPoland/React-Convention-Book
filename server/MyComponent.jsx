import React from 'react';
 
export class MyComponent extends React.Component {
  constructor(props) {
    this.state = { value: props.initialValue };
  }
  render() {
    var items = [ 1, , 3 ].map(x => <span key={x}>{x * this.state.value}</span>);
    return <div>{items}</div>;
  }
}