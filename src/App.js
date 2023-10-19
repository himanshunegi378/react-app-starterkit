import "./App.css";
import { Formio } from "@formio/react";
import FormioContrib from "@formio/contrib";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Components from "./components/Components";
import MetFormioComponents from "met-formio";
import { myField } from "./customFormComponents/MyField/MyField";
import { RuleTable } from "./customFormComponents/RuleTable/RuleTable";
import "./customFormComponents/TextField/TextField";
import { TextField } from "./customFormComponents/TextField/TextField";
Formio.use(FormioContrib);
Formio.use(MetFormioComponents);
Formio.Utils.Evaluator.noeval = false;
Formio.use({
  components: {
    mycomp: myField,
    dmn: RuleTable,
    textfield: TextField,
  },
  templates: {
    bootstrap: {
      ruletable: {
        form: `<div>
          <% if (ctx.mode === "edit") { %>
            <button ref="saveButton">Save</button>
            <button ref="cancelButton">Cancel</button>
          <% } else if (ctx.mode === "view") { %>
            <button ref="editButton">Edit</button>
          <% } %>
        <div ref="dmnContainer" id="{{ctx.id}}" class="dmn-container"></div>
        
      </div>
      
      `,
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes basename={"/react-app-starterkit"}>
        <Route path="/" element={<Home />}></Route>
        <Route path="components" element={<Components />}></Route>
      </Routes>
    </div>
  );
}

export default App;
