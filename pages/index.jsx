import useAuth from '../hooks/useAuth';
import AsideLogin from '../components/AsideLogin';
import withAuthModal from '../components/AuthModal';
import { Box, Button, Flex } from '@chakra-ui/react';
import { GeneralPagesConfig } from '../styles/generalPagesConfig';
import ToggleTheme from '../components/ToggleTheme';

/**
 * funcao responsavel por criar a pagina de login do administrador
 * @param {*} param0 parametro opcional do modal
 * @returns uma pagina formatada com html css e js
 */
function Home({ openAuthModal }) {
  const { user, signinWithGoogle } = useAuth();
  return (
    <GeneralPagesConfig>
      <Flex position="absolute" mt={16} ml={16}>
        <ToggleTheme />
      </Flex>
      <AsideLogin />
      <main>
        <div className="mainContent">
          <img src="/logo.png" alt="BugReports" />
          <div className="separator">Seja Bem Vindo 😄🖖🏻</div>
          <Button
            mt={6}
            onClick={() => openAuthModal()}
            bg={'#0066e8'}
            color={'#fff'}
          >
            Faça o Login para Continuar
          </Button>
        </div>
      </main>
    </GeneralPagesConfig>
  );
}

export default withAuthModal(Home);
