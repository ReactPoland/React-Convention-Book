import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as menuActions from 'actions/menu';
import * as sectionActions from 'actions/section';
import * as menuItemActions from 'actions/menuItem';

import API from 'utils/API';
import falcorUtils from 'utils/falcorUtils';

import Loader from '../../decorators/Loader';
import AddPlaceholder from 'components/menu/AddPlaceholder';
import MenuLibraryView from 'views/menu/MenuLibraryView';


const mapStateToProps = (state) => ({
  session: state.session,
  menu: state.menu,
  menuItem: state.menuItem,
  section: state.section
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    menu: bindActionCreators(menuActions, dispatch),
    section: bindActionCreators(sectionActions, dispatch),
    menuItem: bindActionCreators(menuItemActions, dispatch),
  }
});

@Loader()
class MenuDetailView extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;

    console.log("HAVING");
    console.log(this.props.menuItem);
    console.log("HAVING");
    this._fetchData = this._fetchData.bind(this);

    this.state = {
      menu: this.props.menu.get(id)
    };

    this._fetchData(id);
  }


  async _fetchData(id) {
    const {actions} = this.props;
    console.info("KEEPING IT below");
    
    // const response = await API.get(
    //   ['menusById', id,
    //     'sections', {from: 0, to: 100}, ['id', 'title',
    //       'items'], {from: 0, to: 100}, ['id', 'title', 'description', 'picUrl']]
    // );

    // const sections = falcorUtils.makeArray({
    //   object: response.menusById[id],
    //   name: 'sections'
    // });

    // const menuItems = sections.reduce((sections, section) => {
    //   return sections.concat(falcorUtils.makeArray({
    //     object: section,
    //     name: 'items'
    //   }));
    // }, []);

    // actions.section.sectionList(sections);
    // actions.menuItem.menuItemList(menuItems);
  }


  onAddMenu() {
    /**
     *
     *  TODO
     */
  }

  loader(props) {
    this.props.__showLoaderUntil
      .bind(this, props, 'menu')();
  }

  componentDidMount() {
    this.loader(this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    this.loader(nextState);
    if(nextProps.params.id !== this.props.params.id) {
      this._fetchData(nextProps.params.id);
    }
  }

  componentWillReceiveProps(props, state) {
    const id = props.params.id;
    this.setState({
      menu: props.menu.get(id)
    });
  }

  render() {

    let menuDetailProps = {
      menu: this.state.menu,
      loaded: this.state.loaded,
      __getLoaderMarkup: this.props.__getLoaderMarkup
    }

    // DRY menu detail view
    return <MenuLibraryView isMenuDetailView={true} menuDetailProps={menuDetailProps} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailView);
