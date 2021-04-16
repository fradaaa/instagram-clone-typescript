import { StrictMode } from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FirebaseProvider from "./Firebase/FirebaseProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeAppProvider } from "./Theme";

ReactModal.setAppElement("#root");

ReactDOM.render(
  <StrictMode>
    <ThemeAppProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseProvider>
    </ThemeAppProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
