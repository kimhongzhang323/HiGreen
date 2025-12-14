import { DefaultTheme } from 'react-native-paper';
import { colors } from './colors';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colors, // Spread all custom colors including primaryLight, secondary, etc.
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    roundness: 12,
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
    },
};
