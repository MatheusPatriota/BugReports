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
import Swal from 'sweetalert2'

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  //pid is the uid
  const { uid } = router.query;
  const { reports } = useRoom(uid);

  async function handleStatusToUnderInvestigation(reportId) {
    console.log('marcado como em investigacao');
    await firebase.database().ref(`rooms/${uid}/reports/${reportId}`).update({
      underInvestigation: true,
    });
  }
  async function handleStatusToSolved(reportId) {
    await firebase.database().ref(`rooms/${uid}/reports/${reportId}`).update({
      isSolved: true,
    });
  }
  async function handleRemoveReport(reportId) {
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
  }

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
                    isUnderInvestigation={report.underInvestigation}
                    isSolved={report.isSolved}
                  >
                    <Box>
                      <Flex className="BoxFooterIcons">
                        <button
                          type="button"
                          aria-label="Excluir Ocorrência"
                          onClick={() => handleRemoveReport(report.id)}
                          title="Excluir Ocorrência"
                        >
                          <BsTrash />
                        </button>
                        <button
                          type="button"
                          aria-label="Marcar como concluido"
                          onClick={() => handleStatusToSolved(report.id)}
                          title="Marcar como concluido"
                        >
                          <AiOutlineCheckCircle />
                        </button>
                        <button
                          type="button"
                          aria-label="Marcar como Em Investigação"
                          onClick={() =>
                            handleStatusToUnderInvestigation(report.id)
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
