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
      restaurantsObj: null
    };
    this.nullifyRequestState = this.nullifyRequestState.bind(this);
    this._onAddFormSubmit = this._onAddFormSubmit.bind(this);

  }

  async _fetchData() {
    let pathValueLength = 'restaurantsManage.length';
    let restaurantsLength = await falcorModel.getValue(
      pathValueLength
    ).then((result) => {
      return result;
    });

    let restaurantsResults = await falcorModel.get(
      ['restaurantsManage', {from: 0, to: restaurantsLength} ]
    ).then((result) => {
      return result;
    });

    let RestaurantsObjects = restaurantsResults.json.restaurantsManage;
    if(RestaurantsObjects[0] === 'EMPTY') {
      alert('empty');
      return;
    }

    let restaurantsObj = {};
    Object.keys(RestaurantsObjects).map((index) => {
      let tmplItem = RestaurantsObjects[index];
      restaurantsObj[tmplItem.name] = tmplItem;

    });

    this.setState({ restaurantsObj });

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

  async _onEditFormSubmit(objInfo, model) {

    console.info('_onFormSubmit', objInfo, model);
    
  }

  async _onAddFormSubmit(model) {

    let newRestaurant = await falcorModel
      .call(
            'restaurantsManage.add',
            [model]
          ).
      then((result) => {
        return result;
      });
            
    let newRestaurantName = await falcorModel.getValue('restaurantsManage.newRestaurantName');
    let newRestaurantObj = await falcorModel.getValue('restaurantsManage.newRestaurantObj');
    
    // tutaj dopier pushujesz do this.state.Restaurants z id, z bazy

    let restaurants = this.state.restaurantsObj;
    restaurants[newRestaurantName] = newRestaurantObj;

    this.setState({restaurantsObj: restaurants});   
  }

  render() {
    let templ = this.state.restaurantsObj;
    if(templ === null) return <span />;
    let registrationTextField = <span />;

    if(this.state.itemToEdit) {
      //TODO      
      let regInfo = templ[this.state.itemToEdit];
      let itemEDITname = this.state.itemToEdit;
      // if(typeof regInfo === 'object') {
      //   registrationTextField = (
      //     <Formsy.Form onSubmit={this._onEditFormSubmit.bind(this, regInfo)}>
      //       <h4>{itemEDITname} template in edit</h4>
      //       <DefaultInput
      //         name={itemEDITname}
      //         hintText={itemEDITname+" template in edit"}
      //         multiLine={true}
      //         rows={7}
      //         style={{width: 600}}
      //         defaultValue={regInfo.templateText}
      //         rowsMax={7} />
      //       <div style={{marginTop: 24}}>
      //       <RaisedButton
      //         secondary={true}
      //         type="submit"
      //         disabled={ false /* !this.state.canSubmit */}
      //         style={{margin: '0 auto', display: 'block', width: 150}}
      //         label={'submit'} />
      //       </div>
      //     </Formsy.Form>
      //   );
      // }
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

          <hr />
          <h1>Add new restaurant</h1>
          <Formsy.Form onSubmit={this._onAddFormSubmit}>
          <div className="col-md-6">
            <h4> Restaurant Name: </h4>
            <DefaultInput
              name='name'
              hintText='Restaurant Name' />

            <h4> Restaurant Subdomain: </h4>
            <DefaultInput
              name='subdomain'
              hintText='Restaurant Subdomain (lower-case like starbucks or pizzahut)' />

            <h4> Site Name: </h4>
            <DefaultInput
              name='siteName'
              hintText='Site Name' />

            <h4> Site Description: </h4>
            <DefaultInput
              name='siteDescription'
              hintText='Site Description' />

            <h4> RR Account Manager: </h4>
            <DefaultInput
              name='RRAccountManager'
              hintText='RR Account Manager' />

            <h4> Positions: </h4>
            <DefaultInput
              name='positions'
              hintText='Positions' />

          </div>
          <div className="col-md-6">
            <h4> Client Name: </h4>
            <DefaultInput
              name='clientName'
              hintText='Client Name' />

            <h4> Client Address: </h4>
            <DefaultInput
              name='clientAddress'
              hintText='Client Address' />

            <h4> Client Phone Number: </h4>
            <DefaultInput
              name='clientPhoneNumber'
              hintText='Client Phone Number' />

            <h4> Available Features: </h4>
            <DefaultInput
              name='availableFeatures'
              hintText='Available Features' />

            <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type="submit"
              disabled={ false /* !this.state.canSubmit */}
              style={{margin: '0 auto', display: 'block', width: 150}}
              label={'submit'} />
            </div>
          </div>
          </Formsy.Form>
      </div>
    );
  }
}

export default ManageRestaurantsView;