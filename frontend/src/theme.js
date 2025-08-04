// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#81c784', // lighter green
            main: '#66bb6a', // softer green
            dark: '#4caf50', // darker green for contrast
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#b3e5fc',
            main: '#81d4fa', // light blue that complements green
            dark: '#4fc3f7',
            contrastText: '#000000',
        },
        background: {
            default: 'rgba(162,252,162,0.47)', // lighter background
            paper: '#ffffff',
        },
        text: {
            primary: '#2e3b4e', // softer than black
            secondary: '#78909c', // lighter gray
        },
        divider: 'rgba(0, 0, 0, 0.06)',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', // lighter shadow
                },
                elevation1: {
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
                },
                elevation2: {
                    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.04)',
                },
                elevation3: {
                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.04)',
                },
                elevation4: {
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
                    borderRadius: 8,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 500,
        },
        h2: {
            fontWeight: 500,
        },
        h3: {
            fontWeight: 500,
        },
        h4: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
