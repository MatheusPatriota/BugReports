import { ReportStyles } from './styles';
import { BiUser } from 'react-icons/bi';

/**
 * componente responsavel por padrozinar e exibir cada Ocorrencia
 * @param {*} props propiedades herdadas da pagina
 * @returns retorna um componente pronto para uso com html css e js
 */
export function Report(props) {
  return (
    <ReportStyles
      className={
        (props.underInvestigation ? 'underInvestigation' : '') +
        (props.isSolved ? 'isSolved' : '')
      }
    >
      <p className="tituloOcorrencia">{props.title}</p>
      <p className="textoOcorrencia">{props.content}</p>
      <footer>
        <div className="userInfo">
          <div className="containerIcone">{<BiUser className="icon" />}</div>
          <span>{props.author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer>
    </ReportStyles>
  );
}
