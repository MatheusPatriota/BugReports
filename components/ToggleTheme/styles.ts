import styled from 'styled-components';

export const ToggleThemeStyles = styled.label`

  @media (max-width: 950px) {
    z-index: 3;
    position: absolute;
  }

    position: absolute;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 2vw 0 0 9vw;


  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 40px;
    width: 40px;
    left: 0px;
    bottom: 4px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    box-shadow: 0 0px 15px #2020203d;
    background: white url('/icons/sun.png');
    background-repeat: no-repeat;
    background-position: center;
  }

  input:checked + .slider {
    background-color: #000;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #000;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
    background: white url('/icons/moon.png');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
