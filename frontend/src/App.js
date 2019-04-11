import React from "react";
import { Provider } from "react-redux";

import store from "Redux/store";

import LoginForm from "Components/LoginForm";
import CountryForm from "Components/CountryForm";
import MainForm from "Components/MainForm";
import TableBlock from "Components/TableBlock";

const App = () => (
  <Provider store={store}>
    <LoginForm />
    <CountryForm />
    <div className="main">
      <MainForm />
      <TableBlock />
    </div>
  </Provider>
);

export default App;
