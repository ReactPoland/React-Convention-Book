import React from 'react';
import { FlatButton } from 'material-ui';
import backdraft  from 'backdraft-js';
import ViewerOfRichEditor from 'components/wyswig-draftjs/ViewerOfRichEditor';
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';


export default class DraftExcerpt extends React.Component {
  constructor(props) {
    super(props);

    this._toggle = this._toggle.bind(this);

    this.state = {
      showMoreText: false
    };

  }

  _toggle() {
    this.setState({showMoreText: !this.state.showMoreText});
  }

  render() {
    let classes = ["Excerpt-Content"];
    let buttonJSX;

    let notCollapsedNotation = (typeof this.props.descriptionTwo === 'undefined' && typeof this.props.descriptionThree === 'undefined');


    let descriptionOneDivJSX = (<ViewerOfRichEditor 
      tabIndexProp="100003"
      initialValue={ this.props.descriptionOne }
      name="description"
      title="Description (Level 1)"
      onChangeTextJSON={() => {}} />);



    if(!this.state.showMoreText) {
      if(notCollapsedNotation) {
        buttonJSX = <span />;
      } else {
        buttonJSX = (  
          <ExpandMore
            style={{height: 80, width: 80, cursor: 'pointer'}}
            className="Excerpt-Button"
            onClick={this._toggle}
            label="Show more" />
        );
      }

      classes.push("Excerpt-Content--open");

      let currentDescJSX = (        
        <div className={classes.join(' ')}>
          {descriptionOneDivJSX}
        </div>);

      return (
        <div className="Excerpt">
          {currentDescJSX}
          {buttonJSX}
        </div>);

    } else {
      buttonJSX = (
        <ExpandLess
          style={{height: 80, width: 80, cursor: 'pointer'}}
          className="Excerpt-Button"
          onClick={this._toggle}
          label="Show more" />
      );

      classes.push("Excerpt-Content--open");

      let descriptionTwoDivJSX = this.props.descriptionTwo ? (<ViewerOfRichEditor 
            tabIndexProp="100004"
            initialValue={ this.props.descriptionTwo }
            name="description"
            title="Description (Level 2)"
            onChangeTextJSON={() => {}} />) : <span />;

      let descriptionThreeDivJSX = this.props.descriptionThree ? (<ViewerOfRichEditor 
            tabIndexProp="100005"
            initialValue={ this.props.descriptionThree }
            name="description"
            title="Description (Level 3)"
            onChangeTextJSON={() => {}} />) : <span />;


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
