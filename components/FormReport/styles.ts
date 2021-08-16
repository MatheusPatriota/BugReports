import styled from 'styled-components';
export const ReportStyles = styled.div`
  .container {
    display: block;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    .roomTitle {
      margin: 32px 0 24px;
      display: flex;
      align-items: center;
      h1 {
        font-size: 24px;
      }
      span {
        margin-left: 16px;
        background: #0066e8;
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
      }
    }

    form {
      width: 100%;
      .tituloOcorrencia {
        background-color: #fefefe;
        border: 0;
        min-height: 24px;
        border-radius: 8px;
        padding: 12px;
        font-family: Exo, sans-serif;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
        width: 70%;
      }

      textarea {
        font-family: Exo, sans-serif;
        margin-top: 8px;
        width: 100%;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: #fefefe;
        color: #000;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        resize: vertical;
        min-height: 130px;
      }

      .formFooter {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-top: 16px;

        .btnVideo {
          height: 34px;
          width: 180px;
          padding: 5px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        span {
          font-size: 12px;
          font-weight: 500;
          margin-top: 6px;

          a {
            text-decoration: none;
            color: #0066e8;
          }

          a:hover {
            color: #06288f;
          }
        }
        .userInfo{
          display: flex;
          justify-content: center;
          align-items: center;
          .containerIcone{
  
            img{
              width: 32px;
              margin-right: 12px;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .btnSend {
      margin-top: 8px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      button {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
      }
    }
  }
`;
