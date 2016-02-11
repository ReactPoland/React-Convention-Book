import React from 'react';
import { Link } from 'react-router';

const Menu = (menu) => {
  return (
    <li key={menu.id} className="DashboardBox-Item">
      <Link to={`/menu/${menu.id}`}>{menu.title}</Link>
    </li>
  );
}

export default class MenusBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: this.props.menus.slice(0, 5)
    };
  }

  render() {
    const menus = this.state.menus || this.props.menus;
    return (
      <div className="MenusBox DashboardBox">
        <h3 className="DashboardBox-Header">Menus</h3>
        <ul className="DashboardBox-List">
          {
            menus.map((menu) => {
              return Menu(menu);
            })
          }
        </ul>
      </div>
    );
  }
}
