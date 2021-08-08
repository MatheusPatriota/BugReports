import styled from 'styled-components';

export const GeneralPagesConfig = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  main {
    @media (max-width: 950px) {
      width: 100vw;
      position: absolute;
      align-items: center;
      height: 100vh;
      justify-content: center;
    }

    .bemVindo {
      margin-top: 10px;
      strong {
        color: #0066e8;
        font-size: 18px;
      }
    }
    flex: 8;

    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mainContent {
    display: flex;
    flex-direction: column;
    width: 100vw;
    max-width: 320px;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 24px;
      margin: 64px 0 24px;
      font-family: 'Exo', sans-serif;
    }

    > img {
      align-self: center;
      max-width: 320px;
    }

    form {
      width: 100%;
      /* input {
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        background: #fff;
        color: #000;
        border: 1px solid #0066e8;
        margin-top: 20px;
      } */
      span {
        color: #0066e8;
        margin-left: 5px;
        cursor: pointer;
      }

      span:hover {
        color: #0077ff;
      }
      
      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }

    .registerLine {
      width: 100%;
      display: flex;
      margin-top: 3px;
      align-items: flex-start;

      strong a {
        margin-left: 4px;
        color: #0066e8;
        text-decoration: none;
      }
    }
  }

  .buttonLogin {
    font-family: Exo, sans-serif;
    margin-top: 18px;
    height: 50px;
    border-radius: 8px;
    font-weight: 700;
    background: #0066e8;
    color: #fff;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
      margin-right: 8px;
      width: 38px;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  .separator {
    font-size: 14px;

    margin-top: 16px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      flex: 1;
      height: 1px;
      background: #2b2a2a;
      margin-right: 16px;
    }
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #2b2a2a;
      margin-left: 16px;
      width: 150px;
    }
  }

  .containerPassword {
    display: flex;
    align-items: center;
    max-width: 320px;
    .password {
      z-index: 0;
    }

    .show,
    .hide {
      position: relative;
      margin-top: 22px;
      margin-left: -30px;
      cursor: pointer;
    }

    i {
      font-size: 20px;
      margin: 0 10px;
      color: #0066e8;
    }
  }
`;
