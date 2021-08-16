import useAuth from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { Report } from '../../components/Report';
import { FormReport } from '../../components/FormReport';
import TopBar from '../../components/TopBar';
import { RoomStyle } from '../../styles/room';
import { useRouter } from 'next/router';
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineSearch,
} from 'react-icons/ai';
import { BsCheckAll } from 'react-icons/bs';
import { Box, Flex } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

export default function Room() {
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const router = useRouter();
  const { uid } = router.query;
  const { title, reports } = useRoom(uid);
  console.log('usuario pagina de ocorrencais', user, uid);

  useEffect(() => {
    if(user){

      setUserName(user.name);
      setUserAvatar(user.photoUrl);
    }
  }, [user]);

  return (
    <div>
      <TopBar />
      <main>
        <RoomStyle>
          <FormReport
            roomTitle={title}
            qtdPerguntas={reports.length || 0}
            name={userName}
            avatar={userAvatar}
          />
          {reports ? (
            <div className="report-list">
              {reports.map((report) => {
                return (
                  <Report
                    key={report.id}
                    title={report.title}
                    content={report.content}
                    author={report.author}
                    isUnderInvestigation={report.underInvestigation}
                    isSolved={report.isSolved}
                  >
                    <Flex className="BoxFooterIcons">
                      {!report.underInvestigation && !report.isSolved ? (
                        <span className="ocorrenciaRecebida">
                          <BsCheckAll /> Recebido
                        </span>
                      ) : report.isSolved ? (
                        <span className="ocorrenciaRecebida">
                          <AiOutlineCheckCircle /> Ocorrência Concluída
                        </span>
                      ) : (
                        <span className="ocorrenciaRecebida">
                          <AiOutlineSearch /> Em Investigação
                        </span>
                      )}
                    </Flex>
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
