import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {colorMode === 'light' ? (
        <MoonIcon w={6} h={6} onClick={toggleColorMode} />
      ) : (
        <SunIcon w={6} h={6} onClick={toggleColorMode} />
      )}
    </>
  );
}
