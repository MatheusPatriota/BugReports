import useAuth from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { Report } from '../../components/Report';
import TopBar from '../../components/TopBar';
import { RoomStyle } from '../../styles/room';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  const { roomInfo } = useRoom();

  return (
    <div>
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
