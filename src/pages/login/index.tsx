import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { MessagesValidate, PasswordValidation } from '@/constants';
import { useAppDispatch } from '@/store/hooks';
import { loginRequest } from '@/store/actions/auth';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Email')
    })
    .max(50, {
      message: MessagesValidate.maxLength('Email', 50)
    })
    .email(MessagesValidate.invalidData('Email', 'Wrong format email')),
  password: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Password')
    })
    .max(50, {
      message: MessagesValidate.maxLength('Password', 50)
    })
    .regex(PasswordValidation, {
      message: MessagesValidate.invalidData(
        'Password',
        'Must be at least 8 characters including numbers, uppercase letters, lowercase letters and special characters'
      )
    })
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    dispatch(loginRequest(data));
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Enter password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
