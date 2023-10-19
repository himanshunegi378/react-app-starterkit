import { Form, FormBuilder } from "@formio/react";
import { Formio as FormIoForm } from "formiojs";
import { useState } from "react";
import { Card } from "react-bootstrap";
import ReactJson from "react-json-view";
import "../styles/Builder.css";
const Builder = () => {
  const [jsonSchema, setSchema] = useState({
    components: [
      {
        label: "Name",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        prefix: "",
        suffix: "",
        widget: {
          type: "input",
        },
        inputMask: "",
        displayMask: "",
        applyMaskOn: "change",
        allowMultipleMasks: false,
        customClass: "",
        tabindex: "",
        autocomplete: "",
        hidden: false,
        hideLabel: false,
        showWordCount: false,
        showCharCount: false,
        mask: false,
        autofocus: false,
        spellcheck: true,
        disabled: false,
        tableView: true,
        modalEdit: false,
        multiple: false,
        persistent: true,
        inputFormat: "plain",
        protected: false,
        dbIndex: false,
        case: "",
        truncateMultipleSpaces: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validateOn: "change",
        validate: {
          required: false,
          pattern: "",
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          minLength: "",
          maxLength: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        errorLabel: "",
        errors: "",
        key: "name",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "textfield",
        input: true,
        refreshOn: "",
        dataGridLabel: false,
        addons: [],
        inputType: "text",
        id: "exkitqa",
        defaultValue: "",
      },
      {
        label: "DMN Rule Table",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        customClass: "",
        tabindex: "",
        hidden: false,
        hideLabel: false,
        autofocus: false,
        disabled: false,
        tableView: false,
        modalEdit: false,
        multiple: false,
        persistent: true,
        protected: false,
        dbIndex: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validate: {
          required: false,
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        validateOn: "change",
        errorLabel: "",
        errors: "",
        key: "dmnTable",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [
          {
            name: "name empty",
            trigger: {
              type: "simple",
              simple: {
                show: true,
                when: "name",
                eq: "",
              },
            },
            actions: [
              {
                name: "field disabled",
                type: "property",
                property: {
                  label: "Disabled",
                  value: "disabled",
                  type: "boolean",
                },
                state: true,
              },
            ],
          },
        ],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "dmn",
        input: true,
        dmnXML:
          '<?xml version="1.0" encoding="UTF-8"?>\n        <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">\n          <decision id="decision" name="Check Order">\n            <decisionTable id="decisionTable">\n              <input id="InputClause_0a0smkt">\n                <inputExpression id="LiteralExpression_1ik0pio" typeRef="string">\n                  <text></text>\n                </inputExpression>\n              </input>\n              <output id="OutputClause_1jaj36j" typeRef="string" />\n            </decisionTable>\n          </decision>\n        </definitions>',
        prefix: "",
        suffix: "",
        refreshOn: "",
        dataGridLabel: false,
        widget: null,
        showCharCount: false,
        showWordCount: false,
        allowMultipleMasks: false,
        addons: [],
        id: "ebwbzxp",
        defaultValue: null,
      },
      {
        type: "button",
        label: "Submit",
        key: "submit",
        size: "md",
        block: false,
        action: "submit",
        disableOnInvalid: true,
        theme: "primary",
        id: "e9tukc9",
        input: true,
        placeholder: "",
        prefix: "",
        customClass: "",
        suffix: "",
        multiple: false,
        defaultValue: null,
        protected: false,
        unique: false,
        persistent: false,
        hidden: false,
        clearOnHide: true,
        refreshOn: "",
        redrawOn: "",
        tableView: false,
        modalEdit: false,
        dataGridLabel: true,
        labelPosition: "top",
        description: "",
        errorLabel: "",
        tooltip: "",
        hideLabel: false,
        tabindex: "",
        disabled: false,
        autofocus: false,
        dbIndex: false,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        widget: {
          type: "input",
        },
        attributes: {},
        validateOn: "change",
        validate: {
          required: false,
          custom: "",
          customPrivate: false,
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        conditional: {
          show: null,
          when: null,
          eq: "",
        },
        overlay: {
          style: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        allowCalculateOverride: false,
        encrypted: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        addons: [],
        leftIcon: "",
        rightIcon: "",
      },
    ],
  });
  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };
  return (
    <>
      <FormBuilder form={jsonSchema} onChange={onFormChange} />
      <Card title="Form JSON Schema" className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As JSON Schema</Card.Title>
          <ReactJson src={jsonSchema} name={null} collapsed={true}></ReactJson>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As Rendered Form</Card.Title>
          <Form
            form={jsonSchema}
            options={
              {
                // readOnly: true,
              }
            }
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default Builder;
