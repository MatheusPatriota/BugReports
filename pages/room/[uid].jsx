import useAuth from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import Head from 'next/head';
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

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  //pid is the uid
  const { uid } = router.query;
  const { title, reports } = useRoom(uid);

  return (
    <div>
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
      <TopBar />
      <main>
        <RoomStyle>
          <FormReport roomTitle={title} qtdPerguntas={reports.length || 0} />
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
                        <span>
                          <AiOutlineCheckCircle /> Ocorrência Concluída
                        </span>
                      ) : (
                        <span>
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
