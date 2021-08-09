import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';
import { Button } from '../Button';
import { ReportStyles } from './styles';
import firebase from '../../lib/firebase';
import { useRouter } from 'next/router';

export function FormReport(props) {
  
  const [reportTitle, setReportTitle] = useState();
  const [reportText, setReportText] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const { uid } = router.query;

  async function handleSendNewReport(event) {
    event.preventDefault();
    if (reportText.trim() === '') {
      alert('Descrição Não pode ser vazia')
      return;
    }
    if (reportTitle.trim() === '') {
      alert('Titulo Não pode ser vazio')
      return;
    }
    const report = {
      title: reportTitle,
      content: reportText,
      author: {
        name: user.name,
      },
      isSolved: false,
      underInvestigation: false, 
    };
    await firebase.database().ref(`rooms/${uid}/reports`).push(report);

    setReportText();
    setReportTitle();
  }

  return (
    <ReportStyles>
      <div className="container">
        <div className="roomTitle">
          <h1>{props.roomTitle}</h1>
          <span>({props.qtdPerguntas}) Ocorrência(s)</span>
        </div>
        <form onSubmit={handleSendNewReport}>
          <input
            type="text"
            placeholder="Titulo da Ocorrência"
            className="tituloOcorrencia"
            onChange={(event) => {
              setReportTitle(event.target.value);
            }}
          />
          <textarea
            name="Descrição da ocorrência"
            placeholder="Descreva sua Ocorrência"
            onChange={(event) => {
              setReportText(event.target.value);
            }}
          />
          <div className="formFooter">
            <Button className="btnVideo">Anexar seu Vídeo</Button>
            <div className="userInfo">
              <div className="containerIcone">
                <BiUser className="icon" />
              </div>
              <span>Matheus Patriota</span>
            </div>
          </div>
          <div className="btnSend">
            <Button type="submit">Enviar Ocorrência</Button>
          </div>
        </form>
      </div>
    </ReportStyles>
  );
}
