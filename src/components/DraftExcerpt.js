import React from 'react';
import { FlatButton } from 'material-ui';
import {Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import backdraft  from 'backdraft-js';
import { NavigationChevronRight } from 'material-ui/lib/svg-icons';

var supportedMarkup = {
    'BOLD': ['<strong>', '</strong>'],
    'ITALIC': ['<em>', '</em>']
};

const maxLength = 100;

export default class DraftExcerpt extends React.Component {
  constructor(props) {
    super(props);

    this._toggle = this._toggle.bind(this);

    this.state = {
      showMoreText: false
    };

  }

  _convertJSXFromJSON(contentJSON) {
    let JSXmarkup;
    if(typeof contentJSON === "object") {
      let markedUpBlocks = backdraft(contentJSON, supportedMarkup);
      JSXmarkup = <div dangerouslySetInnerHTML={{ "__html": markedUpBlocks.join("<br />") }} />;
      return JSXmarkup;

    } else {
      JSXmarkup = <div dangerouslySetInnerHTML={{ "__html": "<p>"+contentJSON+"</p>" }} />;
      return JSXmarkup;
    }
  }

  _plainTextLength(contentJSON) {
    let JSXmarkup;
    if(typeof contentJSON === "object") {
      let draftBlock = convertFromRaw(contentJSON);
      let contentState = ContentState.createFromBlockArray(draftBlock);
      let currentLen = contentState.getPlainText().length;

      return currentLen;

    } else {
      JSXmarkup = <div dangerouslySetInnerHTML={{ "__html": contentJSON }} />;
      return contentJSON.length;
    }
  }

  _getPlainText(contentJSON) {
    let plainText;
    if(typeof contentJSON === "object") {
      let draftBlock = convertFromRaw(contentJSON);
      let contentState = ContentState.createFromBlockArray(draftBlock);
      plainText = contentState.getPlainText();
    } else {
      plainText = contentJSON;
    }

    return plainText;
  }

  _toggle() {
    this.setState({showMoreText: !this.state.showMoreText});
  }

  render() {
    let classes = ["Excerpt-Content"];
    let buttonJSX;

    let descOneLen = this._plainTextLength(this.props.descriptionOne);
    let notCollapsedNotation = descOneLen < maxLength && (typeof this.props.descriptionTwo === 'undefined' || typeof this.props.descriptionThree === 'undefined');

    if(!this.state.showMoreText) {
      let currentShortMainDesc;
      if(notCollapsedNotation) {
        buttonJSX = <span />;
      } else {
        buttonJSX = (  
          <NavigationChevronRight
            style={{height: 80, width: 80, cursor: 'pointer'}}
            className="Excerpt-Button"
            onClick={this._toggle}
            label="Show more" />
        );
      }
      let descPlainText = this._getPlainText(this.props.descriptionOne);
      let shortDescText = descPlainText.substring(0, maxLength);
      if(!notCollapsedNotation) {
        shortDescText = shortDescText + '...';
      }

      currentShortMainDesc = <div>{shortDescText}</div>;
      let currentDescJSX = (        
        <div className={classes.join(' ')}>
          {currentShortMainDesc}
        </div>);

      return (
        <div className="Excerpt">
          {currentDescJSX}
          {buttonJSX}
        </div>);

    } else {
      buttonJSX = (
        <NavigationChevronRight
          style={{height: 80, width: 80, cursor: 'pointer'}}
          className="Excerpt-Button"
          onClick={this._toggle}
          label="Show more" />
      );

      classes.push("Excerpt-Content--open");

      let descriptionOneDivJSX = this._convertJSXFromJSON(this.props.descriptionOne);
      let descriptionTwoDivJSX = this.props.descriptionTwo ? this._convertJSXFromJSON(this.props.descriptionTwo) : <span />;
      let descriptionThreeDivJSX = this.props.descriptionThree ? this._convertJSXFromJSON(this.props.descriptionThree) : <span />;

      return (
        <div className="Excerpt">
          <div className={classes.join(' ')}>
            {descriptionOneDivJSX}<br/>
            {descriptionTwoDivJSX}<br/>
            {descriptionThreeDivJSX}
          </div>
          {buttonJSX}
        </div>);
    }
  }
}
