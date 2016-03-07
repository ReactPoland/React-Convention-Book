import React, { PropTypes } from 'react';
import { FlatButton, Paper } from 'material-ui';

export default class AddSectionPlaceholder extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AddSection">
        <Paper className="AddSection-Sheet" zDepth={2}>
          <h3 className="AddSection-CTAHeader">{this.props.title === 'menu' ? "Add section to this menu" : "Add item to this section"}</h3>
        </Paper>
      </div>
    );
  }
}
