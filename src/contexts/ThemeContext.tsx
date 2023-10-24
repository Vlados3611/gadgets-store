import {
  FC,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import {
  useLocaleStorage,
} from '@/hooks/useLocaleStorage';
import logoDarkIcon from '@assets/icons/logoDark.svg';
import logoLightIcon from '@assets/icons/logoLight.svg';
import favoritesDarkIcon from '@assets/icons/favouritesDark.svg';
import favoritesLightIcon from '@assets/icons/favouritesLight.svg';
import shoppingBagDarkIcon from '@assets/icons/shoppingBagDark.svg';
import shoppingBagLightIcon from '@assets/icons/shoppingBagLight.svg';
import themeDarkIcon from '@assets/icons/sunIcon.svg';
import themeLightIcon from '@assets/icons/moonIcon.svg';
import arrowRightDarkIcon from '@assets/icons/arrowRightDark.svg';
import arrowRightLightIcon from '@assets/icons/arrowRightLight.svg';
import arrowLeftDarkIcon from '@assets/icons/arrowLeftDark.svg';
import arrowLeftLightIcon from '@assets/icons/arrowLeftLight.svg';
import arrowUpDarkIcon from '@assets/icons/arrowUpDark.svg';
import arrowUpLightIcon from '@assets/icons/arrowUpLight.svg';

type Theme = 'dark' | 'light';
type ThemeProvider = {
  theme: string;
  toggleTheme: () => void;
  themeIcons: {
    logoPath: string,
    favoriteIcon: string,
    shoppingBagIcon: string,
    themeIcon: string;
    arrowRightIcon: string;
    arrowLeftIcon: string;
    arrowUpIcon: string;
  };
};

export const ThemeContext = createContext<ThemeProvider>({
  theme: 'dark',
  toggleTheme: () => {},
  themeIcons: {
    logoPath: logoDarkIcon,
    favoriteIcon: favoritesDarkIcon,
    shoppingBagIcon: shoppingBagDarkIcon,
    themeIcon: themeDarkIcon,
    arrowRightIcon: arrowRightDarkIcon,
    arrowLeftIcon: arrowLeftDarkIcon,
    arrowUpIcon: arrowUpDarkIcon,
  },
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: FC<Props> = ({
  children
}) => {
  const [theme, setTheme] = useLocaleStorage<Theme>(
    'theme',
    'dark',
  );
  const isDarkTheme = theme === 'dark';
  const themeIcons = useMemo(() => {
    return {
      logoPath: isDarkTheme
        ? logoDarkIcon
        : logoLightIcon,
      favoriteIcon: isDarkTheme
        ? favoritesDarkIcon
        : favoritesLightIcon,
      shoppingBagIcon: isDarkTheme
        ? shoppingBagDarkIcon
        : shoppingBagLightIcon,
      themeIcon: isDarkTheme
        ? themeDarkIcon
        : themeLightIcon,
      arrowRightIcon: isDarkTheme
        ? arrowRightDarkIcon
        : arrowRightLightIcon,
      arrowLeftIcon: isDarkTheme
        ? arrowLeftDarkIcon
        : arrowLeftLightIcon,
      arrowUpIcon: isDarkTheme
        ? arrowUpDarkIcon
        : arrowUpLightIcon
    };
  }, [isDarkTheme]);

  const toggleTheme = useCallback(
    () => {
      setTheme(
        isDarkTheme
          ? 'light'
          : 'dark'
      )
    }, [isDarkTheme, setTheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themeIcons,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
