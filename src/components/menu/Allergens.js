import React from 'react';
import { Checkbox } from 'material-ui';

const allergensDetails = [{
  value: 'vegetarian',
  title: "Vegetarian"
}, {
  value: 'gluten',
  title: 'Gluten Free'
}, {
  value: 'egg',
  title: 'Egg Free'
}, {
  value: 'dairy',
  title: 'Dairy Free'
}, {
  value: 'nut',
  title: 'Nut Free'
}, {
  value: 'soy',
  title: 'Soy Free'
}, {
  value: 'fish',
  title: 'Fish & Shellfish Free'
}];

const wrapperStyles = {

};

export default class Allergen extends React.Component {
  static defaultProps = {
    mode: 'display',
    onChange: () => {},
    allergens: {
      vegetarian: false,
      gluten: false,
      egg: false,
      dairy: false,
      nut: false,
      soy: false,
      fish: false
    }
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.allergens !== nextProps.allergens;
  }

  _toggleAllergen(alergen) {
    const allergens = Object.assign({}, this.props.allergens);
    allergens[alergen] = !allergens[alergen];
    this.props.onChange(allergens);
  }

  render() {
    if(this.props.mode === 'edit') {
      const { allergens } = this.props;

      return (
        <div className="row">
          {
            allergensDetails.map((alergen) => {
              return (
                <div className="col-lg-4" style={wrapperStyles} key={alergen.value}>
                  <Checkbox
                    defaultChecked={allergens[alergen.value]}
                    label={alergen.title}
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
