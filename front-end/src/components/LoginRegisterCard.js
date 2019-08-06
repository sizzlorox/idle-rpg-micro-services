import React, { useState } from "react";
import { Card, FormGroup, InputGroup, Button } from "@blueprintjs/core";
import styled from "@emotion/styled";

/*
  TODO:
    1. Find out how to change form label color in blueprint
    2. Find out formgroup how to have different labels for different inputs
    3. Add some method of changing to different modes, login -> register
    4. Remove login/register from navbar
    5. Find a way of making the particles background interactable, currently with a div over it breaks it.
*/

const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledCard = styled(Card)`
  background: transparent;
  backdrop-filter: blur(2px);
  border: 1px solid white;
  > h5 {
    color: white;
  }
  > label {
    color: white;
  }
`;

export const LoginRegisterCard = ({ children }) => {
  const [mode, setMode] = useState("login");

  return (
    <CardContainer>
      <StyledCard>
        {mode === "login" ? (
          <React.Fragment>
            <h5>Login</h5>
            <FormGroup
              label="Email"
              labelFor="email-input"
              labelInfo="(required)"
            >
              <InputGroup id="email-input" placeholder="Placeholder text" />
              <InputGroup id="password-input" placeholder="Placeholder text" />
            </FormGroup>
            <Button>Login</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>Register</h5>
            <Button>Register</Button>
          </React.Fragment>
        )}
      </StyledCard>
    </CardContainer>
  );
};
export default LoginRegisterCard;
