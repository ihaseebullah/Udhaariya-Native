import AsyncStorage from '@react-native-async-storage/async-storage';
import {getColors} from '../../constants/Colors';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type FontType = {regular: string; bold: string};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  Colors: ReturnType<typeof getColors>;
  font: FontType;
  setFont: (font: FontType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [font, setFont] = useState<FontType>({
    regular: 'Poppins',
    bold: 'Poppins-Bold',
  });

  // Load theme and font from storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        const storedFont = await AsyncStorage.getItem('font');

        if (storedTheme !== null) setIsDarkMode(storedTheme === 'dark');
        if (storedFont !== null) setFont(JSON.parse(storedFont)); // Deserialize font
      } catch (error) {
        console.error('Failed to load theme or font:', error);
      }
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const changeFont = async (newFont: FontType) => {
    try {
      setFont(newFont);
      await AsyncStorage.setItem('font', JSON.stringify(newFont)); // Serialize font
    } catch (error) {
      console.error('Failed to save font:', error);
    }
  };

  const colors = getColors(isDarkMode);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        Colors: colors,
        font,
        setFont: changeFont,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
