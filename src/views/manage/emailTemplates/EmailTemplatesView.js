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

  async newsFeedSendInfo() {
    // this is just example
    let newsItemID = '57230729ffc78524083e1205'; //mocked
     // this will be array of emails in next iteration! (staff members from reducer)
      
    // tutaj ponizej bierzesz maile wszystkich ludzi w staff
    // przypisanych do restaurancji (z reducera staff):
    let newsSendEmail = "kamil.przeorski@gmail.com"; // ['dana@out.com', 'kamil@mobilewebpro.pl']

    let newsFeedSendInfo = await falcorModel
      .call(
            ['newsFeedSendInfo'],
            [newsSendEmail, localStorage.restaurantID, newsItemID]
          ).
      then((result) => {
        return falcorModel.getValue(['newsFeedSendInfo']);
      });
    alert('sent! Check console log of node if the message=== success!');
  }

  async _onFormSubmit(objInfo, model) {

    Object.keys(model).map((changedItem) => {
      objInfo.templateText = model[changedItem];
      let itemToEdit = null;
      let emailTemplates = this.state.emailTemplates;
      emailTemplates[objInfo.templateName] = objInfo;

      if(typeof objInfo.id === 'undefined') {
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
    let templateEditTextField = <span />;

    if(this.state.itemToEdit) {
      let regInfo = templ[this.state.itemToEdit];
      let itemEDITname = this.state.itemToEdit;
      if(typeof regInfo === 'object') {
        templateEditTextField = (
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

    if(typeof templ['newsFeed'] === 'undefined') {
      // handlujesz dodawanie obiektu zamiast update

      templ['newsFeed'] = {
          "templateText" : "News link: [[newsFeedLink]]",
          "templateName" : "newsFeed",
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
          <h1 onClick={this.newsFeedSendInfo}>TEST SEND EMAIL (to kamil gmail)</h1>
          <div className='col-md-12' style={{padding: '20px 20px 20px 20px'}}>
            {templateEditTextField}

            {itemListJSX}
            <Paper zDepth={2} style={{padding: '20px 20px 20px 20px', 'margin': '50px 50px 50px 50px'}}>
              <h4>A LEGEND:</h4>
              <h5>Registration:</h5>
              [[firstName]] - first name<br/>
              [[lastName]] - last name<br/>
              [[email]] - email<br/>
              [[confirmLink]] - confirmLink: REQUIRED, otherwise a new user won't be able to complete a registration<br/>
              <h5>NewsFeed:</h5>
              [[newsFeedLink]] - a link to the created news feed<br/>

            </Paper>
          </div>
      </div>
    );
  }
}

export default EmailTemplateView;