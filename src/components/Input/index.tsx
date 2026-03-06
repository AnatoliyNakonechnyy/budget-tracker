import { Box, FormLabel, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function Input({
  name,
  control,
  errors,
  label,
  type,
  defaultValue,
}: {
  name: string;
  control: any;
  errors: any;
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormLabel sx={{ width: 250, color: 'text.primary' }}>
            {label}
          </FormLabel>
          <TextField
            type={type || 'text'}
            id="outlined-start-adornment"
            {...field}
            fullWidth
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
            margin="dense"
          />
        </Box>
      )}
    />
  );
}
