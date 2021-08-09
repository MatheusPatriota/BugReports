import { ReportStyles } from './styles';
import { BiUser } from 'react-icons/bi';
export function Report(props) {
  return (
    <ReportStyles className="">
      <p className="tituloOcorrencia">{props.title}</p>
      <p className="textoOcorrencia">{props.content}</p>
      <footer>
        <div className="userInfo">
          <div className="containerIcone">
            {<BiUser className="icon" />}
          </div>
          <span>{props.author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer>
    </ReportStyles>
  );
}
