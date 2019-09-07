import React, { Suspense, lazy } from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

// Containers
import NavBar from '../containers/NavBar';

// Components
import Background from '../components/Background';
const LoginRegisterCard = lazy(() => import('../components/LoginRegisterCard'));

const StyledSpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Home = () => {
  const { isAuthorized } = useSelector(state => state.account);

  return (
    <React.Fragment>
      <NavBar />
      <Background>
        <Suspense fallback={(
          <StyledSpinnerContainer>
            <Spinner />
          </StyledSpinnerContainer>
        )}>
          {!isAuthorized && <LoginRegisterCard />}
        </Suspense>
      </Background>
    </React.Fragment>
  );
};
export default Home;
