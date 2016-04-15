import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import API from 'utils/API';
import mapHelpers from 'utils/mapHelpers';

import Filter from 'components/Filter';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

import falcorModel from '../../../falcorModel.js';
import { TextField, Paper, RaisedButton, List, ListItem } from 'material-ui';
import { DefaultInput } from 'components/forms/DefaultInput';


class ManageRestaurantsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      showEditForm: false,
      itemToEdit: null,
      Restaurants: null
    };
    this.nullifyRequestState = this.nullifyRequestState.bind(this);

  }

  async _fetchData() {
    let pathValueLength = 'restaurantsManage.length';
    let restaurantsLength = await falcorModel.getValue(
      pathValueLength
    ).then((result) => {
      return result;
    });


    console.info('restaurantsLength', restaurantsLength);
    console.info('restaurantsLength', restaurantsLength);
    console.info('restaurantsLength', restaurantsLength);
    console.info('restaurantsLength', restaurantsLength);

    let restaurantsResults = await falcorModel.get(
      ['restaurantsManage', {from: 0, to: restaurantsLength} ]
    ).then((result) => {
      return result;
    });
    console.info('\n\n\n\n\n\n 7777 restaurantsResults', restaurantsResults);



    let RestaurantsObjects = restaurantsResults.json.restaurantsManage;
    if(RestaurantsObjects[0] === 'EMPTY') {
      alert('empty');
      return;
    }

    let Restaurants = {};
    Object.keys(RestaurantsObjects).map((index) => {
      let tmplItem = RestaurantsObjects[index];
      Restaurants[tmplItem.name] = tmplItem;

    });


    console.info('Restaurants');
    console.info(Restaurants);
    console.info('Restaurants');

    this.setState({ Restaurants });

    return;
  }

  async componentWillMount() {
      this._fetchData();
  }

  nullifyRequestState() {
    this.setState({
      requestError: null,
      requestSuccess: null
    });
  }

  async _onFormSubmit(objInfo, model) {

    console.info('_onFormSubmit', objInfo, model);
    
    // Object.keys(model).map((changedItem) => {
    //   objInfo.templateText = model[changedItem];
    //   let itemToEdit = null;
    //   let Restaurants = this.state.Restaurants;
    //   Restaurants[objInfo.templateName] = objInfo;
    //   console.info('Restaurants');
    //   console.info(Restaurants);
    //   console.info('Restaurants');

    //   let emailUpdateResult = falcorModel
    //   .call(
    //     ['restaurants', localStorage.restaurantID, 'Restaurants', 'update'],
    //     [Restaurants]
    //   ).
    //   then((result) => {
    //     return result;
    //   });


    //   this.setState({ Restaurants, itemToEdit });
    //   // falcorModel.getValue(
    //   //   pathValue
    //   // );
    // })
  }

  render() {
    let templ = this.state.Restaurants;
    if(templ === null) return <span />;
    let registrationTextField = <span />;

    if(this.state.itemToEdit) {
      let regInfo = templ[this.state.itemToEdit];
      let itemEDITname = this.state.itemToEdit;
      if(typeof regInfo === 'object') {
        registrationTextField = (
          <Formsy.Form onSubmit={this._onFormSubmit.bind(this, regInfo)}>
            <h4>{itemEDITname} template in edit</h4>
            <DefaultInput
              name={itemEDITname}
              hintText={itemEDITname+" template in edit"}
              multiLine={true}
              rows={7}
              style={{width: 600}}
              defaultValue={regInfo.templateText}
              rowsMax={7} />
            <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              disabled={ false /* !this.state.canSubmit */}
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={'submit'} />
            </div>
          </Formsy.Form>
        );
      }
    }

    let itemListJSX = (<List subheader="Items List">
        {
          Object.keys(templ).map((itemKey) => {
            return [
              <ListItem
                key={itemKey}
                primaryText={itemKey}
                secondaryText={'Click here to edit'} 
                onClick={() => this.setState({itemToEdit: itemKey})}/>
            ];
          })
        }
      </List>);

    return (
      <div id='RestaurantView' className="mt100 Content">
          <div className='col-md-12' style={{padding: '20px 20px 20px 20px'}}>
            {registrationTextField}

            {itemListJSX}
          </div>
      </div>
    );
  }
}

export default ManageRestaurantsView;