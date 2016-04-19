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


class EmailTemplateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      showEditForm: false,
      itemToEdit: null,
      emailTemplates: null
    };
    this.nullifyRequestState = this.nullifyRequestState.bind(this);

  }

  async _fetchData() {
    let pathValue = ['restaurants', localStorage.restaurantID, 'emailTemplates', {from: 0, to: 1}];
    let emailTemplatesRes = await falcorModel.get(
      pathValue
    );

    let emailTemplatesObjects = emailTemplatesRes.json.restaurants[localStorage.restaurantID].emailTemplates;
    // if(emailTemplatesObjects[0] === 'EMPTY') {
    //   alert('empty');
    //   return;
    // }
    let emailTemplates = {};
    Object.keys(emailTemplatesObjects).map((index) => {
      let tmplItem = emailTemplatesObjects[index];
      emailTemplates[tmplItem.templateName] = tmplItem;

    });

    this.setState({ emailTemplates });
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

    Object.keys(model).map((changedItem) => {
      objInfo.templateText = model[changedItem];
      let itemToEdit = null;
      let emailTemplates = this.state.emailTemplates;
      emailTemplates[objInfo.templateName] = objInfo;
      // console.info('emailTemplates');
      // console.info(emailTemplates);
      // console.info('emailTemplates');

      if(typeof objInfo.id === 'undefined') {
        // tutaj dodajesz do falcora bo jeszcze nie istnieje
        //alert("UNDEFINED");
        let emailAddResult = falcorModel
        .call(
          ['restaurants', localStorage.restaurantID, 'emailTemplates', 'add'],
          [objInfo]
        ).
        then((result) => {
          return result;
        });

      } else {
        let emailUpdateResult = falcorModel
        .call(
          ['restaurants', localStorage.restaurantID, 'emailTemplates', 'update'],
          [emailTemplates]
        ).
        then((result) => {
          return result;
        });
      }

      this.setState({ emailTemplates, itemToEdit });
      // falcorModel.getValue(
      //   pathValue
      // );
    })
  }

  render() {
    let templ = this.state.emailTemplates;
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

    if(typeof templ['registration'] === 'undefined') {
      // handlujesz dodawanie obiektu zamiast update

      templ['registration'] = {
          "templateText" : "default empty, please change it",
          "templateName" : "registration",
          "ownedByRestaurantID" : localStorage.restaurantID
      };
    }
    
    let itemListJSX = (<List subheader="Items List">
        {          
          Object.keys(templ).map((itemKey) => {
            if (itemKey !== "undefined")              
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
      <div id='emailTemplateView' className="mt100 Content">
          <div className='col-md-12' style={{padding: '20px 20px 20px 20px'}}>
            {registrationTextField}

            {itemListJSX}
            <Paper zDepth={2} style={{padding: '20px 20px 20px 20px', 'margin': '50px 50px 50px 50px'}}>
              <h4>A LEGEND:</h4>
              [[firstName]] - first name<br/>
              [[lastName]] - last name<br/>
              [[email]] - email<br/>
              [[confirmLink]] - confirmLink: REQUIRED, otherwise a new user won't be able to complete a registration<br/>
            </Paper>
          </div>
      </div>
    );
  }
}

export default EmailTemplateView;