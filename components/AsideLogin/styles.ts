import styled from 'styled-components';

export const Aside = styled.aside`
  @media (max-width: 950px) {
    display: none;
    z-index: 0;
  }

  flex: 7;
  width: 60%;
  background-color: #7038BA;
  color: #fff;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 120px 80px;

  img {
    max-width: 100vw;
  }

  strong {
    font: 600 1.7vw 'Exo', sans-serif;
    line-height: 42px;
    margin-top: 16px;
  }

  p {
    font: 300 1.2vw 'Exo', sans-serif;
    color: white;
    line-height: 32px;
    margin-top: 16px;
  }
`;
