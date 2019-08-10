import React from 'react';
import { Classes, Alignment, Navbar, Button } from '@blueprintjs/core';

const NavBar = () => (
  <Navbar className={Classes.DARK}>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>
        Idle-RPG
      </Navbar.Heading>
      <Navbar.Divider />
    </Navbar.Group>
  </Navbar>
);
export default NavBar;
