import useAuth from '../../../hooks/useAuth';
import { useRoom } from '../../../hooks/useRoom';
import { Report } from '../../../components/Report';
import TopBar from '../../../components/TopBar';
import { RoomStyle } from '../../../styles/room';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { BsCheckAll, BsTrash } from 'react-icons/bs';
import { Box, Flex } from '@chakra-ui/layout';
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineSearch,
} from 'react-icons/ai';
import firebase from '../../../lib/firebase';
import Swal from 'sweetalert2';
import Head from 'next/head';
import { sendEmail } from '../../../utils/utils';

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  //pid is the uid
  const { uid } = router.query;
  const { reports } = useRoom(uid);

  async function handleStatusToUnderInvestigation(reportId, authorEmail) {
    await firebase.database().ref(`rooms/${uid}/reports/${reportId}`).update({
      underInvestigation: true,
      isSolved: false,
    });

    let template_params = {
      from_name: 'contato.bugreports@gmail.com:',
      message:
        'Sua ocorrência está sendo investigada por nosso time de devs, fique ligado no seu email para novas atualizações 🧑🏼‍💻🧑🏻‍💻👩🏻‍💻',
      to_name: authorEmail,
    };

    sendEmail(template_params);
  }
  async function handleStatusToSolved(reportId, authorEmail) {
    await firebase.database().ref(`rooms/${uid}/reports/${reportId}`).update({
      isSolved: true,
      underInvestigation: false,
    });

    let template_params = {
      from_name: 'contato.bugreports@gmail.com:',
      message:
        'Sua ocorrência foi Resolvida por nosso time de devs, Agradecemos Sua Participação 🧑🏼‍💻🧑🏻‍💻👩🏻‍💻',
      to_name: authorEmail,
    };

    sendEmail(template_params);
  }
  async function handleRemoveReport(reportId, authorEmail) {
    Swal.fire({
      title: 'Quer mesmo excluir essa Ocorrência?',
      showDenyButton: true,
      confirmButtonText: `Remover`,
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Removido com Sucesso!', '', 'success');
        await firebase
          .database()
          .ref(`rooms/${uid}/reports/${reportId}`)
          .remove();
      } else if (result.isDenied) {
        Swal.fire('Ocorrencia não foi Removida!', '', 'info');
      }
    });

    let template_params = {
      from_name: 'contato.bugreports@gmail.com:',
      message:
        'Sua ocorrência foi Removida por nosso time de devs, Agradecemos Sua Participação 🧑🏼‍💻🧑🏻‍💻👩🏻‍💻',
      to_name: authorEmail,
    };

    sendEmail(template_params);
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
                    underInvestigation={report.underInvestigation}
                    isSolved={report.isSolved}
                  >
                    <Box>
                      <Flex className="BoxFooterIcons">
                        <button
                          className="excluir"
                          type="button"
                          aria-label="Excluir Ocorrência"
                          onClick={() =>
                            handleRemoveReport(report.id, report.author.email)
                          }
                          title="Excluir Ocorrência"
                        >
                          <BsTrash />
                        </button>
                        <button
                          className="concluida"
                          type="button"
                          aria-label="Marcar como concluido"
                          onClick={() =>
                            handleStatusToSolved(report.id, report.author.email)
                          }
                          title="Marcar como concluido"
                        >
                          <AiOutlineCheckCircle />
                        </button>
                        <button
                          className="emInvestigacao"
                          type="button"
                          aria-label="Marcar como Em Investigação"
                          onClick={() =>
                            handleStatusToUnderInvestigation(
                              report.id,
                              report.author.email,
                            )
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
