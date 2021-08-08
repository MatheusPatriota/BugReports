import styled from 'styled-components';

export const ButtonStyle = styled.button`
  font-family: Exo, sans-serif;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #0066e8;
  color: #fff;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &.outlined {
    background: #fff;
    border: 1px solid #835afd;
    color: #835afd;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .icon{
    font-size: 24px;
    margin-right: 5px;
  }
`;
