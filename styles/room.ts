import styled from 'styled-components';
export const RoomStyle = styled.div`
  display: block;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 64px;
  justify-content: center;
  padding: 16px;

  input{
    color: #000;
    ::placeholder {
      color: #000;
    }
  }

  textarea{
    ::placeholder {
      color: #000;
    }
  }
`;
