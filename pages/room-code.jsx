import { GeneralPagesConfig } from '../styles/generalPagesConfig';
import AsideLogin from '../components/AsideLogin';
import { FormEvent, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Head from 'next/head';
import Router from 'next/router';
import { Button, Flex, Input } from '@chakra-ui/react';
import ToggleTheme from '../components/ToggleTheme';
import { ImEnter } from 'react-icons/im';
import firebase from '../lib/firebase';
import swal from 'sweetalert';

/**
 * funcao responsavel por montar a pagina de escolha de sala para o usuario
 * @param {*} props propiedades herdadas da pagina
 * @returns pagina formatada com html css e js
 */
export default function RoomCode(props) {
  const { user, signout } = useAuth();
  const [roomCode, setRoomCode] = useState();
  // console.log(user)
  /**
   * funcao responsavel por guiar o usuario ate a pagina da sala do projeto
   * @param {*} event caputra os eventos da pagina
   */
  async function handleJoinRoom(event) {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef
      .child('rooms')
      .child(roomCode)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          Router.push(`/room/${roomCode}`);
          // console.log(snapshot.val());
        } else {
          swal(
            'Sala Inexistente!',
            'O código da sala informado não existe, por favor tente novamente!',
            'error',
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('user-auth')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <GeneralPagesConfig>
        <Flex position="absolute" mt={16} ml={16}>
          <ToggleTheme />
        </Flex>
        <AsideLogin />
        <main>
          <div className="mainContent">
            <img src="/logo.png" alt="BugReports" />
            <span className="bemVindo">
              Bem vindo(a)
              {user && <strong> {user.name}</strong>}
            </span>
            <div className="separator">Seja Bem Vindo</div>
            <form onSubmit={handleJoinRoom}>
              <Input
                required
                type="text"
                name="codeRoom"
                placeholder="Digite o Código da Sala"
                onChange={(event) => {
                  setRoomCode(event.target.value);
                }}
                mt="8px"
                __placeholder__={'color: #000000'}
              />
              <Button type="submit" bg={'#0066e8'} color="#fff">
                <ImEnter /> &nbsp; Entrar na Sala
              </Button>
              <div className="registerLine">
                Não é sua conta?
                <strong>
                  <span
                    onClick={() => {
                      signout();
                    }}
                    styles="cursor:pointer"
                  >
                    Fazer Logout
                  </span>
                </strong>
              </div>
            </form>
          </div>
        </main>
      </GeneralPagesConfig>
    </>
  );
}
