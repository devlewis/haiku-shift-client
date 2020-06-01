import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HaikuForm from "./HaikuForm.js";

//////////testing element no. 1/////////////////
// const animal1 = { word: "cat", syllables: 1 };
// const animal2 = { word: "ant", syllables: 1 };
// const place = { word: "rainforest", syllables: 3 };
// const adjective = { word: "cantankerous", syllables: 4 };
// const adjective2 = { word: "red", syllables: 1 };
// const verb_a = { word: "play", syllables: 1 };
// const verb_p1 = { word: "faint", syllables: 1 };
// const verb_p2 = { word: "pray", syllables: 1 };

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <HaikuForm />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
