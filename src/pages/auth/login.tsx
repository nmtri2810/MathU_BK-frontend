import React, { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Path, Role } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginRequest } from '@/store/actions/auth';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '@/validations/auth';
import Layout from '@/layout/mainLayout';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = useAppSelector((state) => state.auth.tokens?.accessToken);
  const roleId = useAppSelector((state) => state.auth.user?.role.id);

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

  useEffect(() => {
    if (accessToken) navigate(roleId === Role.ADMIN ? Path.HOME_CLIENT : Path.HOME_CLIENT); // HOME_ADMIN
  }, [accessToken, navigate, roleId]);

  return (
    <Layout>
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
                    <Input
                      placeholder='Enter email'
                      type='email'
                      errorMsg={form.formState.errors.email?.message}
                      {...field}
                    />
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
                    <Input
                      placeholder='Enter password'
                      type='password'
                      errorMsg={form.formState.errors.password?.message}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
