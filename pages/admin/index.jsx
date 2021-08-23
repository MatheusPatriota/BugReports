import useAuth from '../../hooks/useAuth';
import AsideLogin from '../../components/AsideLogin';
import { GeneralPagesConfig } from '../../styles/generalPagesConfig';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import ToggleTheme from '../../components/ToggleTheme';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ImEnter } from 'react-icons/im';

/**
 * funcao responsavel por montar a pagina de login do administrador
 * @returns uma pagina formatada com html css e js
 */
export default function AdminLoginPage() {
  const { user, signinWithEmailAndPassword } = useAuth();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  /**
   * funcao responsavel por mandar as informacoes fornecidas pelo usuario para a autenticacao do banco de dados
   * @param {*} event captura os eventos do formulario
   */
  const handleSigninEmailAndPassword = (event) => {
    event.preventDefault();
    signinWithEmailAndPassword(email, password);
  };

  return (
    <>
      <GeneralPagesConfig>
        <Flex position="absolute" mt={16} ml={16} zIndex={99999}>
          <ToggleTheme />
        </Flex>
        <AsideLogin />
        <main>
          <div className="mainContent">
            <img src="/logo.png" alt="BugReports" />
            <div className="separator">Seja Bem Vindo</div>
            <form onSubmit={handleSigninEmailAndPassword}>
              <div>
                <Input
                  placeholder="Informe seu Email"
                  borderColor="#0066e8"
                  size="lg"
                  type="text"
                  name="email"
                  required
                  value={email}
                  reference="email"
                  mt={'8px'}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <InputGroup
                size="lg"
                mt={'8px'}
                borderColor="#0066e8"
                key="password"
              >
                <Input
                  required
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Insira sua Senha"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="inputSenha"
                />
                <InputRightElement width="4.5rem" mr={'8px'}>
                  <Button
                    h="1.75rem"
                    size="lg"
                    onClick={handleClick}
                    mb={'16px'}
                  >
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button type="submit" bg={'#0066e8'} color="#fff">
                <ImEnter /> &nbsp; Entrar
              </Button>
            </form>
          </div>
        </main>
      </GeneralPagesConfig>
    </>
  );
}
