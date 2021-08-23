import styled from 'styled-components';

export const RoomCodeStyles = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  color: white;
  cursor: pointer;

  display: flex;

  .icon{
    color: #fff;
  }

  div {
    background: #0066e8;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 200px;
    font-size: 14px;
    font-weight: 500;
  }
`;
