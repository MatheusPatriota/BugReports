import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function TogglePasswordVisiblity() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [iconEye, setIconeye] = useState(<AiFillEyeInvisible />);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    if (passwordShown) {
      setIconeye(<AiFillEyeInvisible />);
    } else {
      setIconeye(<AiFillEye />);
    }
  };
  return (
    <div className="containerPassword">
      <input
        className="password"
        type={passwordShown ? 'text' : 'password'}
        name="password"
        placeholder="Informe sua Senha"
        required
      />
      <i className="show" onClick={togglePasswordVisiblity}>
        {iconEye}
      </i>
    </div>
  );
}

export { TogglePasswordVisiblity };
