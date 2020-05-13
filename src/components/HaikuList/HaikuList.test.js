import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HaikuList from "./HaikuList.js";
import Context from "../../Context";

let value = {
  haiku: [],
  haikuStore: [],
  randomIds: [],
  eraseIds: () => {},
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Context.Provider value={value}>
        <HaikuList />
      </Context.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
