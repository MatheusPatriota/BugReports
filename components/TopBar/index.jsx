import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  useColorModeValue,
  useColorMode,
  Box,
  Image,
} from '@chakra-ui/react';
import { RoomCode } from '../RoomCode';
import ToggleTheme from '../ToggleTheme';
import {useRouter} from 'next/router';

/**
 * funcao reponsavel por criar o componente TopBar, com html css e js
 * @param {*} props propiedades herdadas da pagina
 * @returns retorna uma topbar para ser utilizada em outros lugares da aplicacao
 */
function TopBar(props) {
  const bg = useColorModeValue('#FFFFFF', '#1A202C');
  const color = useColorModeValue('#1A202C', '#EDEEEE');
  const borderColor = useColorModeValue('#DDD', '#27272A');
  const router = useRouter();
  const {uid} = router.query;
  return (
    <Flex
      w={'full'}
      position="fixed"
      zIndex={99999}
      bgColor={bg}
      color={color}
      borderBottom={`1px solid ${borderColor}`}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        maxW="1200px"
        margin="0 auto"
        h="60px"
        px={[4, 8]}
      >
        <Box>
          <Image
            w={'150px'}
            src="/logo.png"
            alt="BugReports"
            title="BugReports"
          />
        </Box>
        <Box justifyContent="space-between">
          <Flex alignItems="center" justifyContent="space-between" w="full">
            <Box mr={'8px'} >
              {props.children}
            </Box>
            <Box>
              <RoomCode code={uid} />
            </Box>
            <Box ml={'5'}>
              <ToggleTheme />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default TopBar;
