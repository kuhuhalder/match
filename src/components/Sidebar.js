import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/account">
        Account
      </a>


      <a className="menu-item" href="/matches">
        View Matches
      </a>

      <a className="menu-item" href="/profile">
        Edit Profile
      </a>

      <a className="menu-item" href="/edit-profile">
        View Profile
      </a>

      <a className="menu-item" href="/logout">
        Logout
      </a>
    </Menu>
  );
};