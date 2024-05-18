import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { loginRequest } from '@/store/actions/auth';
import { LoginSchema } from '@/validations/auth';
import { OpenCloseEyeIcon } from '@/components/pages/auth/openCloseEyeIcon';
import Auth from '@/pages/auth';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

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
    <Auth isLogin={true} title='Login to MathU' description='Enter your information to login to your account'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 pt-0 grid gap-4'>
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
                <div className='flex justify-between items-center'>
                  <FormLabel>Password</FormLabel>
                  <span className='text-sm font-normal leading-none text-blue-700 hover:text-blue-800 hover:cursor-pointer hover:underline select-none'>
                    Forgot password?
                  </span>
                </div>
                <div className='relative'>
                  <FormControl>
                    <Input
                      className='pr-9'
                      placeholder='Enter password'
                      type={isShowPassword ? 'text' : 'password'}
                      errorMsg={form.formState.errors.password?.message}
                      {...field}
                    />
                  </FormControl>
                  <OpenCloseEyeIcon
                    isShowPassword={isShowPassword}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-4' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </Auth>
  );
};

export default Login;
