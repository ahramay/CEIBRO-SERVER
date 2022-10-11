import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import colors from "./assets/colors";
import { IntlProvider } from "react-intl";
import messages_en from "./translation/en.json";
import { PersistGate } from "redux-persist/integration/react";
import "./translation/i18next";
import { ConfirmProvider } from "material-ui-confirm";

const messages: any = {
  en: messages_en,
};

const language: string = navigator.language.split(/[-_]/)[0];

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondaryBlue,
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    button: {
      textTransform: "none",
      fontSize: 12,
      fontWeight: "bold",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <IntlProvider locale={language} messages={messages[language]}>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
