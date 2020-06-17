import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { SnackbarProvider } from 'notistack';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const store = configureStore();

const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[600],
        },
        secondary: {
            main: amber[600],
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
