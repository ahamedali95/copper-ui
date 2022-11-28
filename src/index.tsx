import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from "./layout/theme";
import Routes from "./Routes";
import store from "./reducers/store";
import {Provider} from "react-redux";

const App: FC<{}> = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root')!);