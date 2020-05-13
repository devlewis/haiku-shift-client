import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HaikuBox from "./HaikuBox.js";
import Context from "../../Context";

let value = {
  haiku: [],
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Context.Provider value={value}>
        <HaikuBox />
      </Context.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
