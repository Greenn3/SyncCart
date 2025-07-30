import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './theme';
const root = ReactDOM.createRoot(document.getElementById('root'));



const clientId = '183773098779-av4gfomlnkno2qvp5o7nkubvrlci1qan.apps.googleusercontent.com';


root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <App />
                </ThemeProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
