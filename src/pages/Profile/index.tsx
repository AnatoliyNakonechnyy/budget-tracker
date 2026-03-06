import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import photo from '../../asset/photo.svg';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { User } from '../../features/user/model/types';
import {
  RegistrationSchema,
  type RegistrationFormDataType,
} from '../../features/auth/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../app/hooks';
import { createNewUser } from '../../features/user/model/userSlice';
import Input from '../../components/Input';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

export default function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormDataType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegistrationSchema),
    mode: 'onSubmit',
  });

  const dispatch = useAppDispatch();

  const onFormSubmit: SubmitHandler<RegistrationFormDataType> = (data) => {
    dispatch(createNewUser(data));
  };

  const user: User | null = useAppSelector(
    (state: RootState) => state.user.user,
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 2,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h5" component="div">
          Profile & Settings
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mb: 2,
            alignItems: 'flex-start',
          }}
        >
          <img
            src={photo}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              marginBottom: 16,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Typography>{user?.name ?? ''}</Typography>
            <Typography>{user?.email ?? ''}</Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Typography>Personal Details</Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            name="name"
            control={control}
            errors={errors}
            label="Name"
            defaultValue={user?.name ?? ''}
          />

          <Input
            name="email"
            control={control}
            errors={errors}
            label="Email Address"
            defaultValue={user?.email ?? ''}
          />

          <Input
            name="password"
            control={control}
            errors={errors}
            label="Password"
            type="password"
            defaultValue={user?.password ?? ''}
          />

          <Input
            name="confirmPassword"
            control={control}
            errors={errors}
            label="Confirm Password"
            type="password"
            defaultValue={user?.password ?? ''}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
          >
            update
          </Button>
        </form>
        <Typography>Budget Settings</Typography>
        <Typography>Category Management</Typography>
        <Typography>Notifications Settings</Typography>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
            alignItems: 'flex-start',
          }}
        >
          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="Budget Alerts"
          />

          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="AI Insights"
          />
          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked />}
            label="Reminders"
          />
        </FormGroup>
      </Box>
    </>
  );
}
