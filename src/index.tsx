import { ThemeProvider } from "@material-ui/core";
import React, { FC } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import theme from "./layout/theme";
import store from "./reducers/store";
import Routes from "./Routes";

const App: FC<Record<string, never>> = () => {
    return (
        <Provider
            store={store}
        >
            <ThemeProvider
                theme={theme}
            >
                <Routes />
            </ThemeProvider>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root")!);