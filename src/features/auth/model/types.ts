import { z } from 'zod';

const RegistrationSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Email must be a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const LoginSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegistrationFormDataType = z.infer<typeof RegistrationSchema>;
export type LoginFormDataType = z.infer<typeof LoginSchema>;

export { RegistrationSchema, LoginSchema };
