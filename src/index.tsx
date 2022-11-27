import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Box, ThemeProvider, createTheme } from '@material-ui/core';
import theme from "./layout/theme";
import Routes from "./Routes";
import NavBar from "./components/Layout/NavBar";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const App: FC<{}> = () => {
    return (

            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Routes />
                </MuiPickersUtilsProvider>

            </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root')!);