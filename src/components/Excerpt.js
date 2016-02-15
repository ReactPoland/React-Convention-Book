import React from 'react';
import { FlatButton } from 'material-ui';

const maxLength = 400;

export default class Excerpt extends React.Component {
  constructor(props) {
    super(props);

    const content = this.props.text;
    const open = this.props.open || false;
    const excerpt = content.substring(0, maxLength) + '...';
    const longEnough = content.length > maxLength;

    this.state = {
      text: open || !longEnough ? content : excerpt,
      excerpt,
      content,
      open
    };

    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    const open = !this.state.open;
    const { content, excerpt } = this.state;

    this.setState({
      text: open ? content : excerpt,
      open
    });
  }

  render() {
    let btn = null;
    let classes = ["Excerpt-Content"];

    if(this.state.content.length > maxLength) {
      if(this.state.open) {
        classes.push("Excerpt-Content--open");
        btn = (
          <FlatButton
            primary={true}
            onClick={this._toggle}
            className="Excerpt-Button"
            label="Show less" />
        );
      } else {
        btn = (
          <FlatButton
            primary={true}
            onClick={this._toggle}
            className="Excerpt-Button"
            label="Show more" />
        );
      }
    }

    return (
      <div className="Excerpt">
        <p className={classes.join(' ')}>{this.state.content}</p>
        {btn}
      </div>
    );
  }
}
