import React from 'react';
import { Checkbox } from 'material-ui';

const allergensDetails = [{
  value: 'vegetarian',
  title: 'Vegetarian',
  icon: 'Ⓥ',
  color: '#00B050'
}, {
  value: 'gluten',
  title: 'Gluten Free',
  icon: 'Ⓖ',
  color: '#833C0B'

}, {
  value: 'egg',
  title: 'Egg Free',
  icon: 'Ⓔ',
  color: '#7030A0'
}, {
  value: 'dairy',
  title: 'Dairy Free',
  icon: 'Ⓓ',
  color: '#ff0000'
}, {
  value: 'nut',
  title: 'Nut Free',
  icon: 'Ⓝ',
  color: '#BF8F00'
}, {
  value: 'soy',
  title: 'Soy Free',
  icon: 'Ⓢ',
  color: '#404040'
}, {
  value: 'fish',
  title: 'Fish & Shellfish Free',
  icon: 'Ⓕ',
  color: '#0070C0'
}];

const wrapperStyles = {

};



class AllergyGuide extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderAllergyGuide() {
    let allergyGuideJSX = allergensDetails.map((allergenItem, index) => {
      return <span key={index} style={{paddingRight: 4, color: allergenItem.color}}>{allergenItem.icon}-{allergenItem.title}</span>
    });
    return allergyGuideJSX;
  }

  render() {
    return (
      <div>

          <h4>Allergy Guide</h4>
            {this._renderAllergyGuide()}
          <hr/>
      </div>
    );
  }
}




export default class Allergen extends React.Component {
  static defaultProps = {
    mode: 'display',
    onChange: () => {}
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(this.props.allergens)
      this.setState({allergens: this.props.allergens});
  }

  _toggleAllergen(alergen) {
    this.props.onChange(alergen);
  }

  _renderAllergens(allergensObj) {
    let allergensJSX = [];

    let currentAllergen = allergensDetails.filter((obj) => obj.value === "vegetarian");

    for(let key in allergensObj) {
      if(allergensObj[key] === true) {
        let currentAllergen = allergensDetails.filter((obj) => obj.value === key);
        if(typeof currentAllergen[0] !== 'undefined') {
          allergensJSX.push(
            <span style={{fontSize: 15, color: currentAllergen[0].color, paddingRight: 5, paddingLeft: 5}}>
              {currentAllergen[0].icon}
            </span>);
       }
      }
    }
    return allergensJSX;
  }

  render() {
    if(this.props.allergyGuide === true) {
      return <AllergyGuide />;
    }

    if(this.props.readOnly === true) { 
      return <div style={{paddingLeft: 15}}>{this._renderAllergens(this.props.allergensObj)}</div>;

    }

    if(this.props.mode === 'edit') {
      const { allergens } = this.props;

      return (
        <div className="row">
          {
            allergensDetails.map((alergen) => {
              return (
                <div className="col-lg-4" style={wrapperStyles} key={alergen.value}>
                  <Checkbox
                    defaultChecked={allergens ? allergens[alergen.value] : null}
                    label={<span style={{color: alergen.color}}>{alergen.icon} {alergen.title}</span>}
                    onCheck={this._toggleAllergen.bind(this, alergen.value)} />
                </div>
              );
            })
          }
        </div>
      )
    } else {
      return (
        <div>TODO</div>
      );
    }
  }
}
