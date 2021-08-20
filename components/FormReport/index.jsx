import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';
import { Button } from '../Button';
import { ReportStyles } from './styles';
import firebase from '../../lib/firebase';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import emailjs from 'emailjs-com';

export function FormReport(props) {
  const [reportTitle, setReportTitle] = useState();
  const [reportText, setReportText] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const { uid } = router.query;
  // console.log('usuario pagina de from',user, uid)
  // console.log(props.avatar)

  async function handleSendNewReport(event) {
    //gerando o timestamp da data atual
    let currentData = new Date().getTime() / 1000;
    event.preventDefault();

    if (reportText.trim() === '') {
      alert('Descrição Não pode ser vazia');
      return;
    }
    if (reportTitle.trim() === '') {
      alert('Titulo Não pode ser vazio');
      return;
    }
    const report = {
      title: reportTitle,
      content: reportText,
      author: {
        name: user.name,
      },
      isSolved: false,
      //data é armazenada em timestamp
      registerDate: currentData.toString(),
      underInvestigation: false,
    };
    await firebase.database().ref(`rooms/${uid}/reports`).push(report);

    setReportText('');
    setReportTitle('');

    let template_params = {
      from_name: 'contato.bugreports@gmail.com:',
      message:
        'Sua ocorrência foi cadastrada com Sucesso, fique ligado no seu email para novas atualizações 🧑🏼‍💻🧑🏻‍💻👩🏻‍💻',
      to_name: user.email,
    };

    emailjs
      .send(
        'service_qk3iplp',
        'template_bugReports',
        template_params,
        'user_JPO0dwMhpoUMtAJlAk4m8',
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          swal(
            'Ocorrencia cadastrada com Sucesso',
            'Enviamos um email confirmando Sua nova Ocorrência =D',
            'success',
          );
        },
        function (error) {
          console.log('FAILED...', error);
          swal('Erro ao enviar Email', `${error.message}`, 'error');
        },
      );
  }

  return (
    <ReportStyles>
      <div className="container">
        <div className="roomTitle">
          <h1>{props.roomTitle}</h1>
          <span>({props.qtdPerguntas}) Ocorrência(s)</span>
        </div>
        <form onSubmit={handleSendNewReport} id="form">
          <input
            type="text"
            placeholder="Titulo da Ocorrência"
            className="tituloOcorrencia"
            onChange={(event) => {
              setReportTitle(event.target.value);
            }}
            value={reportTitle}
          />
          <textarea
            name="Descrição da ocorrência"
            placeholder="Descreva sua Ocorrência"
            onChange={(event) => {
              setReportText(event.target.value);
            }}
            value={reportText}
          />
          <div className="formFooter">
            {/* <Button className="btnVideo">Anexar seu Vídeo</Button> */}
            <div className="userInfo">
              <div className="containerIcone">
                {props.avatar ? (
                  <img src={props.avatar} alt="icone autor" className="icon" />
                ) : (
                  <BiUser className="icon" />
                )}
              </div>
              <span>{props.name}</span>
            </div>
            <div className="btnSend">
              <Button type="submit">Enviar Ocorrência</Button>
            </div>
          </div>
        </form>
      </div>
    </ReportStyles>
  );
}
