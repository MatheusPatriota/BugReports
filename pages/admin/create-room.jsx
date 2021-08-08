import { useState } from 'react';
import AsideLogin from '../../components/AsideLogin';
import { GeneralPagesConfig } from '../../styles/generalPagesConfig';
import useAuth from '../../hooks/useAuth';
import firebase from '../../lib/firebase';
import { Button, Flex, Input } from '@chakra-ui/react';
import ToggleTheme from '../../components/ToggleTheme';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
export default function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const router = useRouter();

  async function handleCreateRoom(event) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = firebase.database().ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorEmail: user.email,
      authorId: user?.uid,
    }).then((response) => {
      swal("Sala Criada com Sucesso!", "voltar para sala de administração", "success");
    }).catch((error) => {
      swal("Sala Criada com Sucesso!", "voltar para sala de administração", "error");

    });

    router.push(`./room`);
  }

  return (
    <GeneralPagesConfig>
      <Flex position="absolute" mt={16} ml={16}>
        <ToggleTheme />
      </Flex>
      <AsideLogin />
      <main>
        <div className="mainContent">
          <img src="/logo.png" alt="BugReports" />
          <div className="separator">Seja Bem Vindo Administrador😄🖖🏻</div>
          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              placeholder="informe o nome da sala"
              mt={'10px'}
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit" bg={'#0066e8'} color="#fff">
              Criar Sala
            </Button>
          </form>
        </div>
      </main>
    </GeneralPagesConfig>
  );
}