import React, { useImperativeHandle, useState } from "react";
import TextField from "@mui/material/TextField";

const TextFieldAdapter = React.forwardRef(
  ({ value: _value, onChange, disabled }, ref) => {
    const [value, setValue] = useState(_value || "");

    // Expose functions to the parent via ref
    useImperativeHandle(ref, () => ({
      setState: (newState) => {
        if (newState?.value !== undefined) {
          setValue(newState.value);
        }
      },
      state: {
        value: value,
      },
    }));

    return (
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        fullWidth
        size="small"
        hiddenLabel
        disabled={disabled}
        variant="outlined"
      />
    );
  }
);

export default TextFieldAdapter;
