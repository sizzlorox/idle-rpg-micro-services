import React from 'react';
import styled from '@emotion/styled';

// Components
import Background from '../components/Background';
import LoginRegisterCard from '../components/LoginRegisterCard';

// Containers
import NavBar from '../containers/NavBar';

const Home = () => {

  return (
    <React.Fragment>
      <NavBar />
      <Background>
        <LoginRegisterCard />
      </Background>
    </React.Fragment>
  );
};
export default Home;
