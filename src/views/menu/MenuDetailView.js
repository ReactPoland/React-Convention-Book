import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as menuActions from 'actions/menu';

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
  actions: bindActionCreators(menuActions, dispatch)
});

@Loader()
class MenuDetailView extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;

    this.state = {
      menu: this.props.menu.get(id)
    };
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
                sectionSketch={section}
                key={section.id} />
            );
          })
        }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailView);
