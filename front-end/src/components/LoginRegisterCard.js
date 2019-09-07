import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Classes,
  Card,
  FormGroup,
  InputGroup,
  Button,
  Tab,
  Tabs
} from "@blueprintjs/core";
import Recaptcha from "react-recaptcha";
import styled from "@emotion/styled";

// Redux
import { setHomeCardTab } from '../redux/actions/uiAction';
import { loginAccount, registerAccount } from '../redux/actions/accountAction';

const CardContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledCard = styled(Card)`
  background-color: rgba(48, 64, 77, 0.5) !important;
  backdrop-filter: blur(2px);
  border: 1px solid white;
`;

export const LoginRegisterCard = ({ children }) => {
  const { homeCardTab } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <CardContainer>
      <StyledCard className={Classes.DARK}>
        <Tabs
          id="loginRegisterTabs"
          onChange={newTabId => dispatch(setHomeCardTab(newTabId))}
          selectedTabId={homeCardTab}
          renderActiveTabPanelOnly
        >
          <Tab
            id="login"
            title="Login"
            panel={
              <React.Fragment>
                <FormGroup
                  label="Email"
                  labelFor="email-input"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="email-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label="Password"
                  labelFor="password-input"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button onClick={() => dispatch(loginAccount({ email, password }))}>
                  Login
                </Button>
              </React.Fragment>
            }
          />
          <Tab
            id="register"
            title="Register"
            panel={
              <React.Fragment>
                <FormGroup
                  label="Email"
                  labelFor="email-input"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="email-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label="Password"
                  labelFor="password-input"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label="Confirm Password"
                  labelFor="confirm-password-input"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="confirm-password-input"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <Recaptcha
                  sitekey={GOOGLE_SITE_KEY}
                  theme="dark"
                  render="onload"
                  verifyCallback={() => console.log("verified")}
                />
                <Button onClick={() => dispatch(registerAccount({ email, password, confirmPassword }))}>
                  Register
                </Button>
              </React.Fragment>
            }
          />
        </Tabs>
      </StyledCard>
    </CardContainer>
  );
};
export default LoginRegisterCard;
