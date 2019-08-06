import React from "react";
import Particles from "react-particles-js";
import styled from '@emotion/styled';

const StyledParticles = styled(Particles)`
  background: #182026;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Background = ({ children }) => {
  return (
    <React.Fragment>
      <StyledParticles
        params={{
          particles: {
            number: {
              value: 50
            },
            size: {
              value: 3
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              }
            }
          }
        }}
      />
      {children}
    </React.Fragment>
  );
};
export default Background;
