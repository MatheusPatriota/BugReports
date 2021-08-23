import styled from 'styled-components';

export const ReportStyles = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  padding: 18px;
  color: #000;
  margin: 16px 0 16px 0;
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  justify-content: center;

  &.underInvestigation {
    filter: drop-shadow(2px 2px 4px rgba(151,123,24,1));
    border: 1px solid rgba(151,123,24,1);
  }

  &.isSolved {
    filter: drop-shadow(2px 2px 4px green);
    border: 1px solid rgba(50,238,50,1);
    
  }

  .tituloOcorrencia {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .userInfo {
      display: flex;
      align-items: center;

      .containerIcone {
        background-color: #0066e8;
        border-radius: 50%;
        width: 32px;
        height: 32px;

        .icon {
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }

      span {
        margin-left: 4px;
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #0066e8;

          svg path {
            stroke: #0066e8;
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }

    .BoxFooterIcons {
      button {
        color: rgba(3, 3, 3, 1);
        font-size: 22px;
        padding: 10px;
      }

      span {
        svg {
          margin-top: 4px;
        }
        display: flex;
        color: rgba(3, 3, 3, 1);
        font-size: 18px;
        padding: 10px;
        gap: 8px;
      }
      .ocorrenciaRecebida {
        color: #0066e8;
        cursor: default;
      }
      .concluida{
        color: green;
      }
      .emInvestigacao{
        color: orange;
      }
      .excluir{
        color: red;
      }
    }
  }
`;
