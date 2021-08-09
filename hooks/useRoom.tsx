import { useEffect, useState } from "react";
import firebase from "../lib/firebase";
import useAuth  from "./useAuth";

type ReportType = {
  id: string;
  author: {
    name: string;
    photoUrl?: string;
  };
  title:string;
  content: string;
  isSolved: boolean;
  underInvestigation: boolean;
};

type FirebaseReports = Record<
  string,
  {
    author: {
      name: string;
    };
    title:string;
    content: string;
    isSolved: boolean;
    underInvestigation: boolean;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = firebase.database().ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
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
          };
        }
      );
      setTitle(databaseRoom.title);
      setReports(parsedReports);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { reports, title };
}