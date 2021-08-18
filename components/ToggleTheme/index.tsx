import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ToggleThemeStyles } from './styles';

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div title="Mudar Tema">
      <ToggleThemeStyles>
        {colorMode === 'light' ? (
          <MoonIcon w={6} h={6} onClick={toggleColorMode} />
        ) : (
          <SunIcon w={6} h={6} onClick={toggleColorMode} />
        )}
      </ToggleThemeStyles>
    </div>
  );
}
