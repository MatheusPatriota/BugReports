import { ReportStyles } from './styles';
import { BiUser } from 'react-icons/bi';
export function Report() {
  return (
    <ReportStyles className="">
      <p className="tituloOcorrencia">Titulo Ocorrencia</p>
      <p className="textoOcorrencia">Conteudo Ocorrencia</p>
      <footer>
        <div className="userInfo">
          <div className="containerIcone">
            <BiUser className="icon" />
          </div>
          <span>Matheus Patriota</span>
        </div>
        <div>icones</div>
      </footer>
    </ReportStyles>
  );
}
