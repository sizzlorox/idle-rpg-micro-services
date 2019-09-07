import React from 'react';
import { Classes, Alignment, Navbar, Button } from '@blueprintjs/core';
import auth from '../core/auth';

const NavBar = () => (
  <Navbar className={Classes.DARK}>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>
        Idle-RPG
      </Navbar.Heading>
      <Navbar.Divider />
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      {
        auth.isAuthorized() && (
          <Button onClick={() => auth.deauthorize()} minimal>
            Logout
          </Button>
        )
      }
    </Navbar.Group>
  </Navbar>
);
export default NavBar;
