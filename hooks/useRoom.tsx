import { useEffect, useState } from 'react';
import firebase from '../lib/firebase';
import useAuth from './useAuth';

//tipagem 
type ReportType = {
  id: string;
  author: {
    name: string;
    email: string;
    photoUrl?: string;
  };
  title: string;
  content: string;
  isSolved: boolean;
  underInvestigation: boolean;
  registerDate: string;
};

type FirebaseReports = Record<
  string,
  {
    author: {
      name: string;
      email: string;
    };
    title: string;
    content: string;
    isSolved: boolean;
    underInvestigation: boolean;
    registerDate: string;
  }
>;

type FirebaseRooms = Record<
  string,
  {
    authorEmail: string;
    authorId: string;
    title: string;
  }
>;
type RoomType = {
  authorEmail: string;
  authorId: string;
  title: string;
};

/**
 * funcao responsavel por estruturar o esqueleto das salas
 * @param roomId id da sala de projeto selecionado
 * @returns retorna as funcoes criadas
 */
export function useRoom(roomId?: string) {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportType[]>([]);
  const [title, setTitle] = useState('');
  const [roomInfo, setRoomInfo] = useState<RoomType[]>([]);

  useEffect(() => {
    const getAllRooms = firebase.database().ref(`rooms`);
    
    if (roomId) {
      const roomRef = firebase.database().ref(`rooms/${roomId}`);
      roomRef.on('value', (room) => {
        const databaseRoom = room.val();
        const firebaseReports: FirebaseReports = databaseRoom.reports ?? {};
        const parsedReports = Object.entries(firebaseReports).map(
          ([key, value]) => {
            return {
              id: key,
              title: value.title,
              content: value.content,
              author: value.author,
              underInvestigation: value.underInvestigation,
              isSolved: value.isSolved,
              registerDate: value.registerDate,
            };
          },
        );
        setTitle(databaseRoom.title);
        setReports(parsedReports);
      });

      return () => {
        roomRef.off('value');
      };
    }
    /**
     * funcao responsavel por listar todas as salas do banco de dados
     */
    getAllRooms.on('value', (room) => {
      const dataBaseRooms = room.val();
      const firebaseReports: FirebaseRooms = dataBaseRooms ?? {};
      const parsedReports = Object.entries(firebaseReports).map(
        ([key, value]) => {
          return {
            id: key,
            title: value.title,
            authorId: value.authorId,
            authorEmail: value.authorEmail,
          };
        },
      );
      console.log('databse info', parsedReports);
      setRoomInfo(parsedReports);
    });
    return () => {
      getAllRooms.off('value');
    };
  }, [roomId, user?.id]);

  return { reports, title, roomInfo };
}
