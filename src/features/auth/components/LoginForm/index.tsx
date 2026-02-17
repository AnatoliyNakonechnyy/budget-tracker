import {
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { LoginSchema, type LoginFormDataType } from '../../model/types';
import { useAppDispatch } from '../../../../app/hooks';
import { fetchUser } from '../../../user/model/userSlice';
import Input from '../../../../components/Input';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
  });

  const dispatch = useAppDispatch();

  const onFormSubmit: SubmitHandler<LoginFormDataType> = (data) => {
    dispatch(fetchUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Input name="email" control={control} errors={errors} label="Email Address" />

      <Input name="password" control={control} errors={errors} label="Password" type="password" />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        sx={{ mt: 3 }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
