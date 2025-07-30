// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00c853', // zmień na swój kolor
        },
        secondary: {
            main: '#b2ff59',
        },
        background: {
            default: '#f4f4f4',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
    },
});

export default theme;
