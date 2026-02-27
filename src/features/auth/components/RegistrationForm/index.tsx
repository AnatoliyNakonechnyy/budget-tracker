import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import {
  RegistrationSchema,
  type RegistrationFormDataType,
} from '../../model/types';
import { useAppDispatch } from '../../../../app/hooks';
import { createNewUser } from '../../../user/model/userSlice';
import Input from '../../../../components/Input';
import { useAppSelector } from '../../../../app/hooks';
import type { RootState } from '../../../../app/store';
import type { User } from '../../../user/model/types';
import { useNavigate } from 'react-router';

const RegistrationForm = () => {
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

  const navigate = useNavigate();
  if (user) {
    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Input name="name" control={control} errors={errors} label="Name" />

      <Input
        name="email"
        control={control}
        errors={errors}
        label="Email Address"
      />

      <Input
        name="password"
        control={control}
        errors={errors}
        label="Password"
        type="password"
      />

      <Input
        name="confirmPassword"
        control={control}
        errors={errors}
        label="Confirm Password"
        type="password"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        sx={{ mt: 3 }}
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
