import useAuth from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { Report } from '../../components/Report';
import TopBar from '../../components/TopBar';
import { RoomStyle } from '../../styles/room';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import firebase from '../../lib/firebase';
import Head from 'next/head'

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  const { roomInfo } = useRoom();

  async function handleRemoveRoom(roomId) {
    Swal.fire({
      title: 'Quer mesmo excluir essa Sala?',
      showDenyButton: true,
      confirmButtonText: `Remover`,
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Removido com Sucesso!', '', 'success');
        await firebase.database().ref(`rooms/${roomId}`).remove();
      } else if (result.isDenied) {
        Swal.fire('Sala não foi Removida!', '', 'info');
      }
    });
  }

  return (
    <div>
      <Head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('admin-auth')) {
                window.location.href = "/admin"
              }
            `,
          }}
        />
      </Head>
      <TopBar>
        <Link href={'./create-room'}>
          <Button bg={'#0066e8'} color="#fff">
            Criar Sala
          </Button>
        </Link>
      </TopBar>
      <main>
        <RoomStyle>
          {roomInfo ? (
            <div className="room-list">
              {roomInfo.map((room) => {
                return (
                  <Report
                    key={room.id}
                    title={room.title}
                    author={{ name: 'Administrador' }}
                  >
                    <button
                      type="button"
                      aria-label="Excluir Ocorrência"
                      onClick={() => handleRemoveRoom(room.id)}
                      title="Excluir Ocorrência"
                    >
                      <BsTrash />
                    </button>
                    <Button className="btnEntrarSalaAdmin">
                      <Link href={`./room/${room.id}`}>Entrar na Sala</Link>
                    </Button>
                  </Report>
                );
              })}
            </div>
          ) : (
            <>Não temos ocorrencias ainda</>
          )}
        </RoomStyle>
      </main>
    </div>
  );
}
