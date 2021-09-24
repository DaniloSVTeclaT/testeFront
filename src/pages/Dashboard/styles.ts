import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';
export const Container = styled.div``

export const Header = styled.header`
  padding: 32px 0;
  background: #fff;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    svg {
      color: #288E52;
      width: 20px;
      height: 20px;
      &:hover{
      color:red;
      }
    }
    
    
  }
  
  

`;
export const Section  = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  input {
    flex: 1;
    border-radius: 10px;
    margin-top: 10px;
    
    padding: 16px;
    width: 100%;
    border: 2px solid #232129;
    color: #666360;
    display: flex;
    align-items: center;
    background: transparent;
    background-color:#B0C4DE ;
    border: 0;
    color: #2F4F4F;
    &::placeholder {
      color: #666360;
    }
  } 
  #selection_text{
    flex: 1;
    border-radius: 2px;
    margin-top: 10px;
    padding: 16px;
    width: 100%;
    border: 2px solid #232129;
    color: #666360;
    display: flex;
    align-items: center;
    background: transparent;
    background-color:#B0C4DE ;
    border: 0;
    color: #2F4F4F;
    &::placeholder {
      color: #666360;
    }
  }
  option{
    font-size: 12px;
  }
  
`;
export const Profile = styled.div`
  display: flex;
  
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const RegistrationUpdate = styled.div`
  flex: 1;
  
  h1 {
    font-size: 36px;
  }
  
`;


const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;


export const List = styled.div`
  flex: 1;
  flex-direction: column;
 
 
`;