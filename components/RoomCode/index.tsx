import { RoomCodeStyles } from './styles';
import { CopyIcon } from '@chakra-ui/icons';
import swal from 'sweetalert';

// tipagem das propuiedades 
type RoomCodeProps = {
  code: string;
};

/**
 * componente reponsavel por exibir o botao de copia de codigo
 * @param props propiedades herdadas da pagina
 * @returns retorna um componente estilizado e formatado com html css js
 */
export function RoomCode(props: RoomCodeProps) {
  
  /**
   * funcao reponsavel por copiar o codigo da pagina 
   */
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    swal("Codigo Copiado com Sucesso!");
  }
  return (
    <RoomCodeStyles onClick={copyRoomCodeToClipboard}>
      <div title="Copiar codigo da sala">
        <CopyIcon/>
      </div>
      {/* <span>Sala #{props.code}</span> */}
    </RoomCodeStyles>
  );
}
