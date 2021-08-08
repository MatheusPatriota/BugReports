import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import TopBar from '../TopBar';

function Layout({ children }) {
  const bgColor = useColorModeValue('#d3d3d3', '#353c42');
  return (
    <Box bgColor={bgColor} minH={'100vh'}>
      <TopBar />
      <Flex flexDirection="column" pt="62px">
        {children}
      </Flex>
    </Box>
  );
}

export { Layout };
