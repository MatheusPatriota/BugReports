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

function TopBar() {
  const bg = useColorModeValue('#FFFFFF', '#1A202C');
  const color = useColorModeValue('#1A202C', '#EDEEEE');
  const borderColor = useColorModeValue('#DDD', '#27272A');
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
            // boxSize="40px"
            // objectFit="cover"
            w={'150px'}
            src="/logo.png"
            alt="BugReports"
            title="BugReports"
          />
        </Box>
        <Box justifyContent="space-between">
          <Flex alignItems="center" justifyContent="space-between" w="full">
            <Box>
              <RoomCode code={'1234'} />
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
