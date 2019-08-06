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
    <Navbar.Group align={Alignment.RIGHT}>
      <Button className={Classes.MINIMAL} text="Login" />
      <Button className={Classes.MINIMAL} text="Register" />
    </Navbar.Group>
  </Navbar>
);
export default NavBar;
