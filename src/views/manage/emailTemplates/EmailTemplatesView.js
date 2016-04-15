import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';

import API from 'utils/API';
import mapHelpers from 'utils/mapHelpers';

import Filter from 'components/Filter';
import ErrorSuccessMsg from 'components/common/ErrorSuccessMsg';

import falcorModel from '../../../falcorModel.js';


class EmailTemplateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      showEditForm: false,
      memberToEdit: null
    };
    this.nullifyRequestState = this.nullifyRequestState.bind(this);

  }

  async _fetchData() {
    let pathValue = ['restaurants', localStorage.restaurantID, 'emailTemplates', 'registration'];
    let emailTemplates;
    emailTemplates = await falcorModel.getValue(
      pathValue
    );

    console.info('\n\n\n\n 1111 emailTemplates', emailTemplates);


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

  render() {

    return (
      <div id='emailTemplateView' className="mt100 Content">
          <div className='col-md-12'>
            <h1>Here was EmailTemplateTable component</h1>
          </div>
      </div>
    );
  }
}

export default EmailTemplateView;