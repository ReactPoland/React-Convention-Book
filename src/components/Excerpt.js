import React from 'react';
import { FlatButton } from 'material-ui';

const maxLength = 400;

export default class Excerpt extends React.Component {
  constructor(props) {
    super(props);

    let content = this.props.text;
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
    let { content, excerpt } = this.state;
    this.setState({
      text: open ? content : excerpt,
      open
    });
  }

  render() {
    let btn = null;
    let classes = ["Excerpt-Content"];

    if(this.state.content.length > maxLength || this.props.descriptionTwo || this.props.descriptionThree) {
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

    let levelTwoThreeJSX = null;
    if(this.state.open && (this.props.descriptionTwo || this.props.descriptionThree)) {
      let levelTwoJSX = this.props.descriptionTwo ? <div><b>LEVEL TWO:</b> {this.props.descriptionTwo} </div> : null;
      let levelThreeJSX = this.props.descriptionThree ? <div><b>LEVEL THREE:</b> {this.props.descriptionThree} </div> : null;
      levelTwoThreeJSX = (
        <div>
          <br/>
          {levelTwoJSX}
          <br/>
          {levelThreeJSX}
        </div>
      );
    }

    return (
      <div className="Excerpt">
        <p className={classes.join(' ')}>
          {this.state.content}
          {levelTwoThreeJSX}
        </p>
        {btn}
      </div>
    );
  }
}
