import React from "react";
import { TextField, Grid, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment onClick={handleShowPassword} position="end">
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
