import React from "react";
import ReactDOM from "react-dom";
import { Components, ReactComponent, Utils } from "@formio/react";

// This is our TextFieldAdapter component (from the previous step).
import TextFieldAdapter from "./TextFieldAdapter";
import _ from "lodash";

export class TextField extends ReactComponent {
  static schema(...extend) {
    return ReactComponent.schema(
      {
        type: "textfield",
        label: "My TextField",
        key: "dmnTable",
      },
      ...extend
    );
  }

  static editForm(...extend) {
    return Components.components.field.editForm(
      [
        {
          key: "display",
          components: [
            {
              type: "select",
              input: true,
              label: "Copy Value from",
              key: "copyField",
              dataSrc: "custom",
              valueProperty: "value",
              data: {
                custom(context) {
                  return Utils.getContextComponents(context);
                },
              },
            },
          ],
        },
      ],
      ...extend
    );
  }

  static get builderInfo() {
    return {
      title: "TextField",
      group: "basic",
      icon: "table",
      weight: 70,
      documentation: "URL_to_documentation",
      schema: TextField.schema(),
    };
  }

  copyCat() {
    if (this.component.copyField) {
      const fieldName = this.component.copyField;
      const fieldValue = _.get(this.data, fieldName);
      const changed = !_.isEqual(this.dataValue, fieldValue);
      if (changed) {
        console.log("updating value");
        this.setValue(fieldValue);
        this.component.disabled = true;
      }
    }
  }

  attach(el) {
    this.on("change", (form) => {
      this.copyCat();
    });
    return super.attach(el);
  }

  attachReact(elem) {
    console.log({
      textField: this,
    });
    let instance;

    ReactDOM.render(
      <TextFieldAdapter
        ref={(_ref) => {
          instance = _ref;
        }}
        value={this.dataValue}
        onChange={(e) => this.updateValue(e.target.value)}
        disabled={this.disabled}
      />,
      elem,
      () => {
        this.reactInstance = instance;
      }
    );
  }

  detachReact(elem) {
    if (elem) {
      ReactDOM.unmountComponentAtNode(elem);
    }
  }
}
