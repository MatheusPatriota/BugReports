import { RoomCodeStyles } from './styles';
import { CopyIcon } from '@chakra-ui/icons';
import swal from 'sweetalert';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
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
