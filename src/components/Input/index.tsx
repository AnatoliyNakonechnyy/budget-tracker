import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function Input({ name, control, errors, label, type }: { name: string, control: any, errors: any, label: string, type?: string }) {
  return <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        label={label}
        type={type || "text"}
        id="outlined-start-adornment"
        {...field}
        fullWidth
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ''}
        margin="dense"
      />
    )}
  />;
}
