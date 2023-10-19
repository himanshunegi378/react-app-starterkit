import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-embedded.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";
import "dmn-js/dist/assets/dmn-js-shared.css";

import DMNModeler from "dmn-js/lib/Modeler";
import DMNViewer from "dmn-js";
import { Components } from "formiojs";
import { debounce } from "lodash";

const randomString = () => "dmn" + Math.random().toString(36).substring(7);

const availableMode = {
  view: "view",
  edit: "edit",
};

export class RuleTable extends Components.components.field {
  constructor(component, options, data) {
    super(component, options, data);
    this.dmnId = "dmn" + Math.random().toString(36).substring(7);
    this.latestPromiseId = null;
    this.promises = new WeakMap();
    this.currentMode = null;
    this.needstoBeReattached = true;
    this.viewer = null;
    this.mode = "view";
    this.dmnXML = `<?xml version="1.0" encoding="UTF-8"?>
    <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
      <decision id="decision" name="Check Order">
        <decisionTable id="decisionTable">
          <input id="InputClause_0a0smkt">
            <inputExpression id="LiteralExpression_1ik0pio" typeRef="string">
              <text></text>
            </inputExpression>
          </input>
          <output id="OutputClause_1jaj36j" typeRef="string" />
        </decisionTable>
      </decision>
    </definitions>`;

    this.setValue(this.dmnXML);
  }

  static schema(...extend) {
    return Components.components.field.schema(
      {
        type: "dmn",
        label: "DMN Rule Table",
        key: "dmnTable",
        defaultValue: `<?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
          <decision id="decision" name="Check Order">
            <decisionTable id="decisionTable">
              <input id="InputClause_0a0smkt">
                <inputExpression id="LiteralExpression_1ik0pio" typeRef="string">
                  <text>hello</text>
                </inputExpression>
              </input>
              <output id="OutputClause_1jaj36j" typeRef="string" />
            </decisionTable>
          </decision>
        </definitions>`,
      },
      ...extend
    );
  }

  static get builderInfo() {
    return {
      title: "DMN Rule Table",
      group: "basic",
      icon: "table",
      weight: 70,
      documentation: "URL_to_documentation",
      schema: RuleTable.schema(),
    };
  }

  render(children) {
    const isViewModeMust = this.options.readOnly || this.disabled;

    console.log("rerendering rule");
    return super.render(
      this.renderString(
        `<div>
       
         <div style="display: {{ ctx.hideActionButtons ? 'none' : 'block' }};">
         <span style="display: {{ ctx.mode === 'edit' ? 'inline' : 'none' }};">
         <button ref="saveButton">Save</button>
         <button ref="cancelButton">Cancel</button>
          </span>

          <button ref="editButton" style="display: {{ ctx.mode === 'view' ? 'inline' : 'none' }};">Edit</button>
          </div>

      <div ref="dmnContainer" id="{{ctx.id}}" class="dmn-container"></div>
      
    </div>`,
        {
          id: this.dmnId,
          mode: this.mode,
          hideActionButtons: isViewModeMust,
        }
      )
    );
  }

  handleElementsChanged = (...args) => {
    console.log({ args });
    console.log("commandStackChanged");
    const promiseId = randomString();
    this.promiseId = promiseId;
    this.viewer.saveXML({ format: true }, (err, updatedXML) => {
      if (err) {
        console.error("Error saving edited DMN XML:", err);
        return;
      }
      if (promiseId === this.promiseId) {
        console.log("saving xml");
        this.dmnXML = updatedXML;
        // this.updateValue(updatedXML)
      }
    });
  };

  onEditClick(e) {
    const isEditable = !(this.options.readOnly || this.disabled);
    if (!isEditable) return;
    this.mode = "edit";
    this.setValue(this.getValue());
    this.redraw();
  }

  onSaveClick(e) {
    this.mode = "view";
    console.log({
      xml: this.dmnXML,
    });
    this.setValue(this.dmnXML);
    this.redraw();
  }

  onCancelClick(e) {
    console.log("cancel clicked");
    this.mode = "view";
    this.dmnXML = this.getValue();
    console.log({
      cancelXml: this.dmnXML,
    });
    this.setValue(this.dmnXML);
    this.redraw();
  }

  attach(element) {
    window.rule = this;
    this.loadRefs(element, {
      dmnContainer: "single",
      saveButton: "single",
      cancelButton: "single",
      editButton: "single",
    });
    console.log({ refs: this.refs });
    const dmnXML = this.dmnXML || this.getValue() || "";
    console.log({ dmnXML });
    const isViewModeMust = this.options.readOnly || this.disabled;

    this.mode = isViewModeMust ? availableMode.view : this.mode;

    // Check if the component is in readOnly mode
    if (this.mode === availableMode.view) {
      this.viewer = new DMNViewer({
        container: document.getElementById(this.dmnId),
      });
    } else {
      this.viewer = new DMNModeler({
        container: document.getElementById(this.dmnId),
      });
    }
    this.viewer.importXML(dmnXML, function (err) {
      if (err) {
        console.error("Error rendering DMN table:", err);
        return;
      }
    });
    this.viewer.on("import.done", () => {
      const activeEditor = this.viewer.getActiveViewer();

      this.eventBus = activeEditor.get("eventBus");
      this.eventBus.on("elements.changed", this.handleElementsChanged);
    });

    this.refs.editButton.addEventListener("click", (e) => this.onEditClick(e));

    this.refs.saveButton.addEventListener("click", (e) => this.onSaveClick(e));

    this.refs.cancelButton.addEventListener("click", (e) =>
      this.onCancelClick(e)
    );
    super.attach(element);
  }

  detach() {
    // this.refs.editButton.remove("click", this.onEditClick(e));

    // this.refs.saveButton.remove("click", this.onSaveClick(e));

    // this.refs.cancelButton.remove("click", this.onCancelClick(e));
    if (this.viewer) {
      if (this.eventBus) {
        // Remove the event listener
        this.viewer.off("import.done");
        this.eventBus.off("elements.changed", this.handleElementsChanged);
        this.viewer.destroy();
      }
      // Cleanup tasks related to DMNModeler or DMNViewer can be added here
      // For instance, if DMNModeler provides a destroy or cleanup method, it should be called here.
    }
    super.detach();
  }

  destroy() {
    if (this.viewer) {
      if (this.eventBus) {
        // Remove the event listener
        this.eventBus.off("elements.changed", this.handleElementsChanged);
      }
      // Cleanup tasks related to DMNModeler or DMNViewer can be added here
      // For instance, if DMNModeler provides a destroy or cleanup method, it should be called here.
      this.viewer.destroy();
      this.viewer = null;
    }
    super.destroy();
  }
}
