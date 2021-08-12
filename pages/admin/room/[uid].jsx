import useAuth from '../../../hooks/useAuth';
import { useRoom } from '../../../hooks/useRoom';
import { Report } from '../../../components/Report';
import TopBar from '../../../components/TopBar';
import { RoomStyle } from '../../../styles/room';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { BsCheckAll } from 'react-icons/bs';
import { Box, Flex } from '@chakra-ui/layout';
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineSearch,
} from 'react-icons/ai';

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  //pid is the uid
  const { uid } = router.query;
  const { reports } = useRoom(uid);

  return (
    <div>
      <TopBar>
        <Link href={'.././dashboard'}>
          <Button bg={'#0066e8'} color="#fff">
            Voltar para Dashboard
          </Button>
        </Link>
      </TopBar>
      <main>
        <RoomStyle>
          {reports ? (
            <div className="report-list">
              {reports.map((report) => {
                return (
                  <Report
                    key={report.id}
                    title={report.title}
                    content={report.content}
                    author={report.author}
                    isAnswered={report.isAnswered}
                    isHighlighted={report.isHighlighted}
                  >
                    <Box>
                      <Flex className="BoxFooterIcons">
                        <button
                          type="button"
                          aria-label="Marcar como concluido"
                          onClick={() =>
                            handleSendLikereport(report.id, report.likeId)
                          }
                          title="Marcar como concluido"
                        >
                          <AiOutlineCheckCircle />
                        </button>
                        <button
                          type="button"
                          aria-label="Marcar como Em Investigação"
                          onClick={() =>
                            handleSendLikereport(report.id, report.likeId)
                          }
                          title="Marcar como Em Investigação"
                        >
                          <AiOutlineSearch />
                        </button>
                        <button
                          className="ocorrenciaRecebida"
                          type="button"
                          aria-label="Marcar como recebido"
                          title="Marcar como recebido"
                          disabled
                        >
                          <BsCheckAll />
                        </button>
                      </Flex>
                    </Box>
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
