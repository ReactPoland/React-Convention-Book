import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as menuActions from 'actions/menu';
import * as sectionActions from 'actions/section';
import * as menuItemActions from 'actions/menuItem';

import API from 'utils/API';

import Loader from '../../decorators/Loader';
import AddPlaceholder from 'components/menu/AddPlaceholder';
import MenuSection from 'components/menu/MenuSection';

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

    this._fetchData = this._fetchData.bind(this);

    this.state = {
      menu: this.props.menu.get(id)
    };

    this._fetchData(id);
  }

  async _fetchData(id) {
    const {actions} = this.props;
    const response = await API.get(
      ['menusById', id, 'sections', {from: 0, to: 100}, ['id', 'title', 'items'], {from: 0, to: 100}, ['id', 'title', 'description', 'picUrl']]
    );
    const sections = response.menusById[id].sections;
    const keys = response.menusById[id].sections ? Object.keys(response.menusById[id].sections) : [];
    keys.splice(keys.indexOf('$__path'), 1);

    const menuItems = keys.reduce((items, index) => {
      const keys = sections[index].items ? Object.keys(sections[index].items) : [];
      keys.splice(keys.indexOf('$__path'), 1);

      const items2 = keys.map((index2) => sections[index].items[index2]);
      return items.concat(items2);
    }, []);

    actions.section.sectionList(response.menusById[id].sections);
    actions.menuItem.menuItemList(menuItems);
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
    const { menu } = this.state;

    if(!this.state.loaded ) {
      return this.props.__getLoaderMarkup();
    }

    if(!menu.sections || !menu.sections.length) {
      return  (
        <AddPlaceholder />
      );
    } else {
      return (
        <div className="Content MenuList">
        <h2>{menu.title}</h2>
        {
          menu.sections.map((section) => {
            return (
              <MenuSection
                sectionId={section}
                key={section} />
            );
          })
        }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailView);
