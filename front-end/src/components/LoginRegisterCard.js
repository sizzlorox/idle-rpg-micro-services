import React, { useState } from "react";
import { useDispatch } from 'react-redux';
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
import { loginAccount, registerAccount } from '../redux/actions/accountAction';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledCard = styled(Card)`
  background-color: rgba(48, 64, 77, 0.5) !important;
  backdrop-filter: blur(2px);
  border: 1px solid white;
`;

export const LoginRegisterCard = ({ children }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <CardContainer>
      <StyledCard className={Classes.DARK}>
        <Tabs
          id="loginRegisterTabs"
          onChange={newTabId => setMode(newTabId)}
          selectedTabId={mode}
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
